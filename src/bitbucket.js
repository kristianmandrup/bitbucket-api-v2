const {
  Constants,
  createApiEnricher
} = require('./util')
const {
  createRequest,
  adapters
} = require('./request')

const {
  getAccessToken
} = require('./auth')

const $api = require('./api')
/**
 * Simple JavaScript Bitbucket API v2
 *
 * Based on the PHP GitHub API project http://github.com/ornicar/php-github-api
 */

async function createAuthenticatedAPI(opts = {}) {
  const accessToken = await getAccessToken(opts)
  opts.accessToken = accessToken
  return createBitBucketAPI(opts)
}

function createBitBucketAPI(opts = {}) {
  let bitbucketApi = new Bitbucket(opts)
  if (opts.accessToken) {
    bitbucketApi.authenticateOAuth2(opts.accessToken)
  }
  return bitbucketApi
}

function Bitbucket(opts = {}) {
  let {
    proxy,
    useXhr
  } = opts

  /**
   * Define HTTP proxy in format localhost:3128
   */
  let $proxy_host
  let $proxy_port
  if (proxy) {
    $proxy_host = proxy.split(':')[0]
    $proxy_port = proxy.split(':')[1]
  }

  let apiModel = {
    $proxy_host,
    $proxy_port,
    constants: Constants
  }

  apiModel.request = createRequest(apiModel)

  const apiEnricher = createApiEnricher(apiModel, opts)
  apiModel = apiEnricher($api)

  let reqOpts = Object.assign({
    proxy_host: $proxy_host,
    proxy_port: $proxy_port,
    use_xhr: useXhr
  }, opts)


  apiModel.authorizeOAuth2 = client_id => {
    let parameters = {
      client_id,
      response_type: 'code'
    }
    apiModel.request.get('oauth2/authorize', parameters || {}, requestOptions, callback)
  }

  /**
   * Authenticate a user for all next requests using an API token
   *
   * @param {String} accessToken
   * @return {BitbucketApi}        fluent interface
   */
  apiModel.authenticateOAuth2 = accessToken => {
    apiModel.request
      .setOption('login_type', 'oauth2')
      .setOption('oauth_access_token', accessToken)

    return apiModel
  }

  /**
   * Deauthenticate a user for all next requests
   *
   * @return {BitbucketApi}               fluent interface
   */
  apiModel.deAuthenticate = () => {
    apiModel.request
      .setOption('login_type', 'none')

    return apiModel
  }

  /**
   * Call any route, GET method
   * Ex: api.get('repos/show/my-username/my-repo')
   *
   * @param {String}  route            the Bitbucket route
   * @param {Object}  parameters       GET parameters
   * @param {Object}  requestOptions   reconfigure the request
   */
  apiModel.get = (route, parameters, requestOptions, callback) =>
    apiModel.request.get(route, parameters || {}, requestOptions, callback)

  /**
   * Call any route, DELETE method
   * Ex: api.delete('repos/show/my-username/my-repo')
   *
   * @param {String}  route            the Bitbucket route
   * @param {Object}  parameters       GET parameters
   * @param {Object}  requestOptions   reconfigure the request
   */
  apiModel.delete = (route, parameters, requestOptions, callback) =>
    apiModel.request.send(route, parameters, 'DELETE', requestOptions, callback)

  /**
   * Call any route, POST method
   * Ex: api.post('repos/show/my-username', {'email': 'my-new-email@provider.org'})
   *
   * @param {String}  route            the Bitbucket route
   * @param {Object}  parameters       POST parameters
   * @param {Object}  requestOptions   reconfigure the request
   */
  apiModel.post = (route, parameters, requestOptions, callback) =>
    apiModel.request.post(route, parameters || {}, requestOptions, callback)

  /**
   * Check for whether we can iterate to another page using this.getNextPage(response).
   * @param {response} A response that was received from the API.
   * @return {boolean} true if the response indicates more pages are available, false otherwise.
   */
  apiModel.hasNextPage = response => !!response.next

  /**
   * Check for whether we can iterate to another page using this.getPreviousPage(response).
   * @param {response} A response that was received from the API.
   * @return {boolean} true if the response indicates a previous pages is available, false otherwise.
   */
  apiModel.hasPreviousPage = response => !!response.previous

  /**
   * Takes a response and a callback and makes an API request for the response's next page. When the next page
   * comes back, the param callback is run on the next-page response.
   * NOTE this should only be called guarded behind a check to this.hasNextPage(response) !
   *
   * @param {response} A response that was received from the API.
   * @param {callback} The callback to run when the response comes back.
   */
  apiModel.getNextPage = (response, callback) => {
    if (!apiModel.hasNextPage(response)) {
      throw new Error(
        'getNextPage: argument has no next page url. Call hasNextPage first to guard this method call.'
      )
    }

    apiModel.request.doPrebuiltSend(response.next, callback)
  }

  /**
   * Takes a response and a callback and makes an API request for the response's previous page. When the previous page
   * comes back, the param callback is run on the previous-page response.
   * NOTE this should only be called guarded behind a check to this.hasPreviousPage(response) !
   *
   * @param {response} A response that was received from the API.
   * @param {callback} The callback to run when the response comes back.
   */
  apiModel.getPreviousPage = (response, callback) => {
    if (!apiModel.hasPreviousPage(response)) {
      throw new Error(
        'getPreviousPage: argument has no next page url. Call hasPreviousPage first to guard this method call.'
      )
    }

    apiModel.request.doPrebuiltSend(response.previous, callback)
  }

  return apiModel
};

module.exports = {
  Bitbucket,
  createBitBucketAPI,
  createAuthenticatedAPI
}
