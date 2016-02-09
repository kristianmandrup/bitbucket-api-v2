const Request = require('./request').Request;

/**
 * Simple JavaScript Bitbucket API v2
 *
 * Based on the PHP GitHub API project http://github.com/ornicar/php-github-api
 */

class Bitbucket {
  constructor(proxy) {
    /**
     * Define HTTP proxy in format localhost:3128
     */
    if (proxy) {
      this.$proxy_host = proxy.split(':')[0];
      this.$proxy_port = proxy.split(':')[1];
    }

    this.request = new Request({ 'proxy_host': this.$proxy_host, 'proxy_port': this.$proxy_port });

    this.constants = {
      pullRequest: {
        states: {
          DECLINED: 'DECLINED',
          MERGED: 'MERGED',
          OPEN: 'OPEN'
        }
      }
    };

    this.repositories = new (require('./repositories'))(this);
    this.user = new (require('./user'))(this);
  }

/**
 * Authenticate a user for all next requests using an API token
 *
 * @param {String} accessToken
 * @return {BitbucketApi}        fluent interface
 */
authenticateOAuth2(accessToken) {
  this.request
      .setOption('login_type', 'oauth2')
      .setOption('oauth_access_token', accessToken);

  return this;
}

  /**
   * Deauthenticate a user for all next requests
   *
   * @return {BitbucketApi}               fluent interface
   */
  deAuthenticate() {
    this.request
        .setOption('login_type', 'none');

    return this;
  }

  /**
   * Call any route, GET method
   * Ex: api.get('repos/show/my-username/my-repo')
   *
   * @param {String}  route            the Bitbucket route
   * @param {Object}  parameters       GET parameters
   * @param {Object}  requestOptions   reconfigure the request
   */
  get(route, parameters, requestOptions, callback) {
    return this.request.get(route, parameters || {}, requestOptions, callback);
  }

  /**
   * Call any route, DELETE method
   * Ex: api.delete('repos/show/my-username/my-repo')
   *
   * @param {String}  route            the Bitbucket route
   * @param {Object}  parameters       GET parameters
   * @param {Object}  requestOptions   reconfigure the request
   */
  delete(route, parameters, requestOptions, callback) { // eslint-disable-line
    return this.request.send(route, parameters, 'DELETE', requestOptions, callback);
  }

  /**
   * Call any route, POST method
   * Ex: api.post('repos/show/my-username', {'email': 'my-new-email@provider.org'})
   *
   * @param {String}  route            the Bitbucket route
   * @param {Object}  parameters       POST parameters
   * @param {Object}  requestOptions   reconfigure the request
   */
  post(route, parameters, requestOptions, callback) {
    return this.request.post(route, parameters || {}, requestOptions, callback);
  }

  /**
   * Check for whether we can iterate to another page using this.getNextPage(response).
   * @param {response} A response that was received from the API.
   * @return {boolean} true if the response indicates more pages are available, false otherwise.
   */
  static hasNextPage(response) {
    return !!response.next;
  }

  hasNextPage(response) {
    return Bitbucket.hasNextPage(response);
  }

  /**
   * Check for whether we can iterate to another page using this.getPreviousPage(response).
   * @param {response} A response that was received from the API.
   * @return {boolean} true if the response indicates a previous pages is available, false otherwise.
   */
  static hasPreviousPage(response) {
    return !!response.previous;
  }

  hasPreviousPage(response) {
    return Bitbucket.hasPreviousPage(response);
  }

  /**
   * Takes a response and a callback and makes an API request for the response's next page. When the next page
   * comes back, the param callback is run on the next-page response.
   * NOTE this should only be called guarded behind a check to this.hasNextPage(response) !
   *
   * @param {response} A response that was received from the API.
   * @param {callback} The callback to run when the response comes back.
   */
  getNextPage(response, callback) {
    if (!this.hasNextPage(response)) {
      throw new Error('getNextPage: argument has no next page url. Call hasNextPage first to guard this method call.');
    }

    this.request.doPrebuiltSend(response.next, callback);
  }

  /**
   * Takes a response and a callback and makes an API request for the response's previous page. When the previous page
   * comes back, the param callback is run on the previous-page response.
   * NOTE this should only be called guarded behind a check to this.hasPreviousPage(response) !
   *
   * @param {response} A response that was received from the API.
   * @param {callback} The callback to run when the response comes back.
   */
  getPreviousPage(response, callback) {
    if (!this.hasPreviousPage(response)) {
      throw new Error('getPreviousPage: argument has no next page url. Call hasPreviousPage first to guard this method call.');
    }

    this.request.doPrebuiltSend(response.previous, callback);
  }
}

module.exports = Bitbucket;
