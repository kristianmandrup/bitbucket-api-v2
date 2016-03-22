const _ = require('lodash');
const https = require('https');
const querystring = require('querystring');
const url = require('url');
const xhr = require('xhr');

/**
 * Performs requests on GitHub API.
 */
const Request = exports.Request = function Request(options) {
  this.configure(options);
};

(function construct() {
  this.$defaults = {
    protocol: 'https',
    path: '/2.0',
    hostname: 'api.bitbucket.org',
    format: 'json',
    user_agent: 'js-bitbucket-api-v2 (http://github.com/Mr-Wallet/node-bitbucket-v2)',
    http_port: 443,
    timeout: 20,
    login_type: 'none',
    username: null,
    password: null,
    api_token: null,
    oauth_access_token: null,
    proxy_host: null,
    proxy_port: null,
    use_xhr: false
  };

  this.configure = function configure(options = {}) {
    this.$options = _.defaults({}, options, this.$defaults);
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
  this.setOption = function setOption(name, value) {
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
  this.getOption = function getOption(name, _defaultValue) {
    const defaultValue = _defaultValue === undefined ? null : _defaultValue;
    return this.$options[name] ? this.$options[name] : defaultValue;
  };

  /**
   * Send a GET request
   * @see send
   */
  this.get = function get(apiPath, parameters, options, callback) {
    return this.send(apiPath, parameters, 'GET', options, callback);
  };

  /**
   * Send a POST request
   * @see send
   */
  this.post = function post(apiPath, parameters, options, callback) {
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
  this.send = function send(apiPath, parameters, httpMethod = 'GET', options, callback) {
    let initialOptions;
    if (options) {
      initialOptions = this.$options;
      this.configure(options);
    }

    this.doSend(apiPath, parameters, httpMethod, (err, _response) => {
      if (err) {
        if (callback) {
          callback(err);
        }
        return;
      }

      const response = this.$options.use_xhr ? _response : this.decodeResponse(_response);

      if (initialOptions) {
        this.$options = initialOptions;
      }
      if (callback) {
        callback(null, response);
      }
    });
  };


  /**
   * Send a request to the server using a URL received from the API directly, receive a response
   *
   * @param {String}   $prebuiltURL       Request URL given by a previous API call
   */
  this.doPrebuiltSend = function doPrebuiltSend(prebuiltURL, callback) {
    const {
      http_port: httpPort,
      oauth_access_token: oauthAccessToken,
      proxy_host: proxyHost,
      proxy_port: proxyPort,
      use_xhr: useXhr
    } = this.$options;
    const port = !useXhr && proxyHost ? proxyPort || 3128 : httpPort || 443;

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + oauthAccessToken
    };

    if (!useXhr) {
      headers['Host'] = 'api.bitbucket.org'; // eslint-disable-line dot-notation
      headers['User-Agent'] = 'NodeJS HTTP Client';
      headers['Content-Length'] = '0';
    }

    const parsedUrl = url.parse(prebuiltURL);

    const getOptions = {
      headers,
      hostname: parsedUrl.hostname,
      method: 'GET',
      path: parsedUrl.path,
      post: port
    };

    let called = false;
    function done(err, body) {
      if (called) {
        return;
      }

      called = true;
      callback(err, body);
    }

    if (useXhr) {
      xhr({ url: prebuiltURL, responseType: 'json', timeout: this.$options.timeout * 1000 }, (error, response) => {
        if (error) {
          done(error);
          return;
        }
        let msg = response.body;
        if (response.statusCode > 204) {
          done({ status: response.statusCode, msg });
          return;
        }
        if (response.statusCode === 204) {
          msg = {};
        }
        done(null, msg);
      });

      return;
    }

    const request = https.request(getOptions, (response) => {
      response.setEncoding('utf8');

      const body = [];
      response.addListener('data', (chunk) => {
        body.push(chunk);
      });
      response.addListener('end', () => {
        let msg = body.join('');

        if (response.statusCode > 204) {
          if (response.headers['content-type'].includes('application/json')) {
            msg = JSON.parse(body);
          }
          else {
            msg = body;
          }

          done({ status: response.statusCode, msg });
          return;
        }
        if (response.statusCode === 204) {
          msg = '{}';
        }
        done(null, this.decodeResponse(msg));
      });

      response.addListener('error', (e) => {
        done(e);
      });

      response.addListener('timeout', () => {
        done(new Error('Request timed out'));
      });
    });

    request.on('error', (e) => {
      done(e);
    });

    request.end();
  };

  /**
   * Send a request to the server, receive a response
   *
   * @param {String}   $apiPath       Request API path
   * @param {Object}    $parameters    Parameters
   * @param {String}   $httpMethod    HTTP method to use
   */
  this.doSend = function doSend(apiPath, parameters, _httpMethod, callback) {
    const httpMethod = _httpMethod.toUpperCase();
    const {
      hostname,
      http_port: httpPort,
      oauth_access_token: oauthAccessToken,
      proxy_host: proxyHost,
      proxy_port: proxyPort,
      use_xhr: useXhr
    } = this.$options;
    const host = !useXhr && proxyHost ? proxyHost : hostname;
    const port = !useXhr && proxyHost ? proxyPort || 3128 : httpPort || 443;

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + oauthAccessToken
    };

    if (!useXhr) {
      headers['Host'] = 'api.bitbucket.org'; // eslint-disable-line dot-notation
      headers['User-Agent'] = 'NodeJS HTTP Client';
      headers['Content-Length'] = '0';
    }

    let query;
    let path = this.$options.path + '/' + apiPath.replace(/\/*$/, '');
    if (httpMethod === 'POST') {
      query = JSON.stringify(parameters);
      if (!useXhr) {
        headers['Content-Type'] = 'application/json';
        headers['Content-Length'] = query.length;
      }
    }
    else {
      query = querystring.stringify(parameters);
      path += '?' + query;
    }

    const getOptions = {
      host,
      post: port,
      path,
      method: httpMethod,
      headers
    };

    let called = false;
    function done(err, body) {
      if (called) {
        return;
      }

      called = true;
      callback(err, body);
    }

    if (useXhr) {
      const xhrOptions = { method: httpMethod, headers, url: `https://${host}${path}`, responseType: 'json', timeout: this.$options.timeout * 1000 };
      if (httpMethod === 'POST') {
        xhrOptions.json = parameters;
      }
      xhr(xhrOptions, (error, response) => {
        if (error) {
          done(error);
          return;
        }
        let msg = response.body;

        if (response.statusCode > 204) {
          done({ status: response.statusCode, msg });
          return;
        }
        if (response.statusCode === 204) {
          msg = {};
        }

        done(null, msg);
      });

      return;
    }

    const request = https.request(getOptions, (response) => {
      response.setEncoding('utf8');

      let body = [];
      response.addListener('data', (chunk) => {
        body.push(chunk);
      });
      response.addListener('end', () => {
        let msg;
        body = body.join('');

        if (response.statusCode > 204) {
          if (response.headers['content-type'].includes('application/json')) {
            msg = JSON.parse(body);
          }
          else {
            msg = body;
          }
          done({ status: response.statusCode, msg });
          return;
        }
        if (response.statusCode === 204) {
          body = '{}';
        }

        done(null, body);
      });

      response.addListener('error', (e) => {
        done(e);
      });

      response.addListener('timeout', () => {
        done(new Error('Request timed out'));
      });
    });

    request.on('error', (e) => {
      done(e);
    });

    if (httpMethod === 'POST') {
      request.write(query);
    }

    request.end();
  };

  /**
   * Get a JSON response and transform to JSON
   */
  this.decodeResponse = function decodeResponse(response) {
    if (this.$options.format === 'text') {
      return response;
    }
    else if (this.$options.format === 'json') {
      return JSON.parse(response);
    }
  };
}).call(Request.prototype);
