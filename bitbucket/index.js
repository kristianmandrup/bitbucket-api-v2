const Request = require('./request').Request;

/**
 * Simple JavaScript Bitbucket API v2
 *
 * Based on the PHP GitHub API project http://github.com/ornicar/php-github-api
 */

const BitBucket = exports.BitBucket = function BitBucket(debug, proxy, http) {
  /**
   * Use debug mode (prints debug messages)
   */
  this.$debug = debug;

  /**
   * Define HTTP proxy in format localhost:3128
   */
  if (proxy) {
    this.$proxy_host = proxy.split(':')[0];
    this.$proxy_port = proxy.split(':')[1];
  }
  if (http) {
    this.$use_http = true;
  }
  /**
   * The list of loaded API instances
   */
  this.$apis = [];
};

(function constructor() {
  /**
   * The request instance used to communicate with Bitbucket
   */
  this.$request = null;

  /**
   * Authenticate a user for all next requests using an API token
   *
   * @param {String} login      Bitbucket username
   * @param {String} token      Bitbucket API token
   * @return {BitbucketApi}        fluent interface
   */
  this.authenticateToken = function authenticateToken(login, token) {
    this.getRequest()
      .setOption('login_type', 'token')
      .setOption('username', login)
      .setOption('api_token', token);

    return this;
  };

  /**
   * Authenticate a user for all next requests using an API token
   *
   * @param {String} login      Bitbucket username
   * @param {String} password   Bitbucket password
   * @return {BitbucketApi}        fluent interface
   */
  this.authenticatePassword = function authenticatePassword(login, password) {
    this.getRequest()
      .setOption('login_type', 'basic')
      .setOption('username', login)
      .setOption('password', password);

    return this;
  };

  /**
   * Authenticate a user for all next requests using an API token
   *
   * @param {OAuth} oauth
   * @param {String} accessToken
   * @return {BitbucketApi}        fluent interface
   */
  this.authenticateOAuth = function authenticateOAuth(oauth, accessToken, accessTokenSecret) {
    this.getRequest()
      .setOption('login_type', 'oauth')
      .setOption('oauth', oauth)
      .setOption('oauth_access_token', accessToken)
      .setOption('oauth_access_token_secret', accessTokenSecret);

    return this;
  };

  /**
   * Authenticate a user for all next requests using an API token
   *
   * @param {String} accessToken
   * @return {BitbucketApi}        fluent interface
   */
  this.authenticateOAuth2 = function authenticateOAuth2(accessToken) {
    this.getRequest()
        .setOption('login_type', 'oauth2')
        .setOption('oauth_access_token', accessToken);

    return this;
  };

  /**
   * Deauthenticate a user for all next requests
   *
   * @return {BitbucketApi}               fluent interface
   */
  this.deAuthenticate = function deAuthenticate() {
    this.getRequest()
        .setOption('login_type', 'none');

    return this;
  };

  /**
   * Call any route, GET method
   * Ex: api.get('repos/show/my-username/my-repo')
   *
   * @param {String}  route            the Bitbucket route
   * @param {Object}  parameters       GET parameters
   * @param {Object}  requestOptions   reconfigure the request
   */
  this.get = function get(route, parameters, requestOptions, callback) {
    return this.getRequest().get(route, parameters || {}, requestOptions, callback);
  };

  /**
   * Call any route, DELETE method
   * Ex: api.delete('repos/show/my-username/my-repo')
   *
   * @param {String}  route            the Bitbucket route
   * @param {Object}  parameters       GET parameters
   * @param {Object}  requestOptions   reconfigure the request
   */
  this['delete'] = function (route, parameters, requestOptions, callback) { // eslint-disable-line
    return this.getRequest().send(route, parameters, 'DELETE', requestOptions, callback);
  };

  /**
   * Call any route, POST method
   * Ex: api.post('repos/show/my-username', {'email': 'my-new-email@provider.org'})
   *
   * @param {String}  route            the Bitbucket route
   * @param {Object}  parameters       POST parameters
   * @param {Object}  requestOptions   reconfigure the request
   */
  this.post = function post(route, parameters, requestOptions, callback) {
    return this.getRequest().post(route, parameters || {}, requestOptions, callback);
  };

  /**
   * Get the request
   *
   * @return {Request}  a request instance
   */
  this.getRequest = function getRequest() {
    if (!this.request) {
      this.request = new Request({ debug: this.$debug, 'proxy_host': this.$proxy_host, 'proxy_port': this.$proxy_port, 'protocol': (this.$use_http ? 'http' : 'https') });
    }

    return this.request;
  };

  this.repositories = new (require('./repositories'))(this);

  /**
   * Check for whether we can iterate to another page using this.getNextPage(response).
   * @param {response} A response that was received from the API.
   * @return {boolean} true if the response indicates more pages are available, false otherwise.
   */
  this.hasNextPage = function hasNextPage(response) {
    return !!response.next;
  };

  /**
   * Check for whether we can iterate to another page using this.getPreviousPage(response).
   * @param {response} A response that was received from the API.
   * @return {boolean} true if the response indicates a previous pages is available, false otherwise.
   */
  this.hasPreviousPage = function hasPreviousPage(response) {
    return !!response.previous;
  };

  /**
   * Takes a response and a callback and makes an API request for the response's next page. When the next page
   * comes back, the param callback is run on the next-page response.
   * NOTE this should only be called guarded behind a check to this.hasNextPage(response) !
   *
   * @param {response} A response that was received from the API.
   * @param {callback} The callback to run when the response comes back.
   */
  this.getNextPage = function getNextPage(response, callback) {
    this.getRequest().doPrebuiltSend(response.next, callback);
  };

  /**
   * Takes a response and a callback and makes an API request for the response's previous page. When the previous page
   * comes back, the param callback is run on the previous-page response.
   * NOTE this should only be called guarded behind a check to this.hasPreviousPage(response) !
   *
   * @param {response} A response that was received from the API.
   * @param {callback} The callback to run when the response comes back.
   */
  this.getPreviousPage = function getPreviousPage(response, callback) {
    this.getRequest().doPrebuiltSend(response.previous, callback);
  };
}).call(BitBucket.prototype);
