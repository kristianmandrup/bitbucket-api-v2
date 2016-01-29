let http = require('http');
let util = require('util');
let querystring = require('querystring');
let crypto = require('crypto');

/**
 * Performs requests on GitHub API.
 */
let Request = exports.Request = function(options) {
    this.configure(options);
};

(function() {

    this.$defaults = {
        protocol    : 'https',
        path        : '/2.0',
        hostname    : 'api.bitbucket.org',
        format      : 'json',
        user_agent  : 'js-bitbucket-api-v2 (http://github.com/Mr-Wallet/node-bitbucket-v2)',
        http_port   : 443,
        timeout     : 20,
        login_type  : 'none',
        username    : null,
        password    : null,
        api_token   : null,
        oauth_access_token: null,
        proxy_host  : null,
        proxy_port  : null,
        debug       : false
    };

    this.configure = function(options)
    {
        options = options || {};
        this.$options = {};
        for (let key in this.$defaults) {
            this.$options[key] = options[key] !== undefined ? options[key] : this.$defaults[key];
        }

        return this;
    };

    /**
     * Change an option value.
     *
     * @param {String} name   The option name
     * @param {Object} value  The value
     *
     * @return {Request} The current object instance
     */
    this.setOption = function(name, value)
    {
        this.$options[name] = value;
        return this;
    };

    /**
    * Get an option value.
    *
    * @param  string $name The option name
    *
    * @return mixed  The option value
    */
    this.getOption = function(name, defaultValue)
    {
        defaultValue = defaultValue === undefined ? null : defaultValue;
        return this.$options[name] ? this.$options[name] : defaultValue;
    };

    /**
     * Send a GET request
     * @see send
     */
    this.get = function(apiPath, parameters, options, callback) {
        return this.send(apiPath, parameters, 'GET', options, callback);
    };

    /**
     * Send a POST request
     * @see send
     */
    this.post = function(apiPath, parameters, options, callback) {
        return this.send(apiPath, parameters, 'POST', options, callback);
    };

    /**
     * Send a request to the server, receive a response,
     * decode the response and returns an associative array
     *
     * @param  {String}    apiPath        Request API path
     * @param  {Object}    parameters     Parameters
     * @param  {String}    httpMethod     HTTP method to use
     * @param  {Object}    options        reconfigure the request for this call only
     */
    this.send = function(apiPath, parameters, httpMethod, options, callback)
    {
        httpMethod = httpMethod || 'GET';
        if(options)
        {
            let initialOptions = this.$options;
            this.configure(options);
        }

        let self = this;
        this.doSend(apiPath, parameters, httpMethod, function(err, response) {
            if (err) {
                callback && callback(err);
                return;
            }

            response = self.decodeResponse(response);

            if (initialOptions) {
                self.options = initialOptions;
            }
            callback && callback(null, response);
        });
    };



    /**
     * Send a request to the server using a URL received from the API directly, receive a response
     *
     * @param {String}   $prebuiltURL       Request URL given by a previous API call
     */
    this.doPrebuiltSend = function(prebuiltURL, callback)
    {
        let host = this.$options.proxy_host ? this.$options.proxy_host : this.$options.hostname;
        let port = this.$options.proxy_host ? this.$options.proxy_port || 3128 : this.$options.http_port || 443;

        let headers = {
            'Host':'api.bitbucket.org',
            'User-Agent': 'NodeJS HTTP Client',
            'Content-Length': '0',
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        switch(this.$options.login_type) {
            case 'oauth2':
                headers.Authorization = 'Bearer ' + this.$options.oauth_access_token;
                break;

            case 'token':
                let auth = this.$options['username'] + '/token:' + this.$options['api_token'];
                let basic = new Buffer(auth, 'ascii').toString('base64');
                headers.Authorization = 'Basic ' + basic;
                break;

            case 'basic':
                let auth = this.$options['username'] + ':' + this.$options['password'];
                let basic = new Buffer(auth, 'ascii').toString('base64');
                headers.Authorization = 'Basic ' + basic;
                break;

            default:
                // none
        }

        let getOptions = {
            host: host,
            post: port,
            url: prebuiltURL,
            headers: headers
        };

        this.$debug('send prebuilt request: ' + prebuiltURL);
        let request = require(this.$options.protocol).request(getOptions, function(response) {
            response.setEncoding('utf8');

            let body = [];
            response.addListener('data', function (chunk) {
                body.push(chunk);
            });
            response.addListener('end', function () {
                let msg;
                body = body.join('');

                if (response.statusCode > 204) {
                    if (response.headers['content-type'].indexOf('application/json') === 0) {
                        msg = JSON.parse(body);
                    } else {
                        msg = body;
                    }
                    done({status: response.statusCode, msg: msg});
                    return;
                }
                if (response.statusCode == 204)
                    body = '{}';

                done(null, body);
            });

            response.addListener('error', function(e) {
                done(e);
            });

            response.addListener('timeout', function() {
                done(new Error('Request timed out'));
            });
        });

        request.on('error', function(e) {
            done(e);
        });

        request.end();

        let called = false;
        function done(err, body) {
            if (called)
                return;

            called = true;
            callback(err, body);
        }
    };

    /**
     * Send a request to the server, receive a response
     *
     * @param {String}   $apiPath       Request API path
     * @param {Object}    $parameters    Parameters
     * @param {String}   $httpMethod    HTTP method to use
     */
    this.doSend = function(apiPath, parameters, httpMethod, callback)
    {
        httpMethod = httpMethod.toUpperCase();
        let host = this.$options.proxy_host ? this.$options.proxy_host : this.$options.hostname;
        let port = this.$options.proxy_host ? this.$options.proxy_port || 3128 : this.$options.http_port || 443;

        let headers = {
            'Host':'api.bitbucket.org',
            'User-Agent': 'NodeJS HTTP Client',
            'Content-Length': '0',
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        let getParams  = httpMethod != 'POST' ? parameters : {};
        let postParams = httpMethod == 'POST' ? parameters : {};


        let getQuery = querystring.stringify(getParams);
        let postQuery = querystring.stringify(postParams);
        this.$debug('get: '+ getQuery + ' post ' + postQuery);

        let path = this.$options.path + '/' + apiPath.replace(/\/*$/, '');
        if (getQuery)
            path += '?' + getQuery;

        if (postQuery)
            headers['Content-Length'] = postQuery.length;

        switch(this.$options.login_type) {
            case 'oauth':
                // TODO this should use oauth.authHeader once they add the missing argument
                let oauth = this.$options.oauth;
                let orderedParameters= oauth._prepareParameters(
                    this.$options.oauth_access_token,
                    this.$options.oauth_access_token_secret,
                    httpMethod,
                    'https://api.bitbucket.org' + path,
                    postParams || {}
                );
                headers.Authorization = oauth._buildAuthorizationHeaders(orderedParameters);
                break;

            case 'oauth2':
                headers.Authorization = 'Bearer ' + this.$options.oauth_access_token;
                break;

            case 'token':
                let auth = this.$options['username'] + '/token:' + this.$options['api_token'];
                let basic = new Buffer(auth, 'ascii').toString('base64');
                headers.Authorization = 'Basic ' + basic;
                break;

            case 'basic':
                let auth = this.$options['username'] + ':' + this.$options['password'];
                let basic = new Buffer(auth, 'ascii').toString('base64');
                headers.Authorization = 'Basic ' + basic;
                break;

            default:
                // none
        }

        let getOptions = {
            host: host,
            post: port,
            path: path,
            method: httpMethod,
            headers: headers
        };

        this.$debug('send ' + httpMethod + ' request: ' + path);
        let request = require(this.$options.protocol).request(getOptions, function(response) {
            response.setEncoding('utf8');

            let body = [];
            response.addListener('data', function (chunk) {
                body.push(chunk);
            });
            response.addListener('end', function () {
                let msg;
                body = body.join('');

                if (response.statusCode > 204) {
                    if (response.headers['content-type'].indexOf('application/json') === 0) {
                        msg = JSON.parse(body);
                    } else {
                        msg = body;
                    }
                    done({status: response.statusCode, msg: msg});
                    return;
                }
                if (response.statusCode == 204)
                    body = '{}';

                done(null, body);
            });

            response.addListener('error', function(e) {
                done(e);
            });

            response.addListener('timeout', function() {
                done(new Error('Request timed out'));
            });
        });

        request.on('error', function(e) {
            done(e);
        });

        if (httpMethod == 'POST')
            request.write(postQuery);

        request.end();

        let called = false;
        function done(err, body) {
            if (called)
                return;

            called = true;
            callback(err, body);
        }
    };

    /**
     * Get a JSON response and transform to JSON
     */
    this.decodeResponse = function(response)
    {
        if(this.$options.format === 'text') {
            return response;
        }
        else if(this.$options.format === 'json') {
            return JSON.parse(response);
        }
    };

    this.$debug = function(msg) {
        if (this.$options.debug)
            console.log(msg);
    };

}).call(Request.prototype);
