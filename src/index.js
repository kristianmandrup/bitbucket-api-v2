const Constants = require('./constants')
const {
  Repositories,
  Commit,
  Commits,
  Components,
  Issues,
  Milestones,
  Pipelines,
  PullRequests,
  Refs,
  Versions,
  Hooks,
  PipelinesConfig,
  Forks,
  Downloads
} = require('./repositories')
const {
  Request
} = require('./request')

const teams = require('./teams')
const user = require('./user')
const users = require('./users')
const addon = require('./addon')
const hookEvents = require('./hook-events')
const snippets = require('./snippets')

let apis = {
  teams,
  user,
  users,
  addon,
  hookEvents,
  snippets
}

/**
 * Simple JavaScript Bitbucket API v2
 *
 * Based on the PHP GitHub API project http://github.com/ornicar/php-github-api
 */

function createBitBucketAPI(opts = {}) {
  return new Bitbucket(opts)
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

  const apiModel = {
    $proxy_host,
    $proxy_port,
    constants: Constants
  }

  // TODO: generate all instead
  let apiNames = Object.keys(apis)
  apiNames.map(name => {
    apiModel[name] = new apis[name](apiModel, opts)
  })

  apiModel.repositories = new Repositories(apiModel, opts)
  apiModel.commit = new Commit(apiModel, opts)
  apiModel.commits = new Commits(apiModel, opts)
  apiModel.components = new Components(apiModel, opts)
  apiModel.issues = new Issues(apiModel, opts)
  apiModel.milestones = new Milestones(apiModel, opts)
  apiModel.pipelines = new Pipelines(apiModel, opts)
  apiModel.pullRequests = new PullRequests(apiModel, opts)
  apiModel.refs = new Refs(apiModel, opts)
  apiModel.versions = new Versions(apiModel, opts)
  apiModel.hooks = new Hooks(apiModel, opts)
  apiModel.pipelinesConfig = new PipelinesConfig(apiModel, opts)
  apiModel.forks = new Forks(apiModel, opts)
  apiModel.downloads = new Downloads(apiModel, opts)
  apiModel.branchRestrictions = new BranchRestrictions(apiModel, opts)

  let reqOpts = Object.assign({
    proxy_host: $proxy_host,
    proxy_port: $proxy_port,
    use_xhr: useXhr
  }, opts)

  apiModel.request = new Request(reqOpts)
  apiModel.teams = new Teams(apiModel, opts)
  apiModel.user = new User(apiModel, opts)
  apiModel.users = new Users(apiModel, opts)
  apiModel.addon = new addon.createApi(apiModel, opts)
  apiModel.snippets = new Snippets(apiModel, opts)
  apiModel.hookEvents = new HookEvents(apiModel, opts)

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
  Repositories,
  User,
  Users,
  Team,
  Addon,
  HookEvents,
  Snippets,
  Request
}
