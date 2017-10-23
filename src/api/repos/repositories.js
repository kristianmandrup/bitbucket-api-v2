const {
  _,
  log,
  handleError,
  buildUri,
  fluid,
  constants,
  createPromisedApi,
  createAbstractApi,
  validateArgs
} = require('./_base')

/**
 * API docs: https://confluence.atlassian.com/bitbucket/repositories-endpoint-423626330.html
 *           https://confluence.atlassian.com/bitbucket/repository-resource-423626331.html
 */
function createApi(api, opts = {}) {
  const result = createAbstractApi(api, opts)

  const localApi = {
    name: 'Repositories',
    /**
     * Create a new repository
     * @param {String} repo owner
     * @param {String} name of the repo. This is not a slug (may include special characters)
     * @param {Object} repo repo metadata as specified by Bitbucket's API documentation.
     *                         NOTE Unlike the normal API, Including an explicit name property in repo is REQUIRED!!
     *                         Due to limitations in the API, the slug is derived from the repo name within this method.
     */
    create(username, repo, callback) {
      if (!repo || !_.isBoolean(repo.is_private) || !_.isString(repo.name)) {
        repo = {
          name: repo,
          is_private: false
        }
        // throw new Error('Repo must be initialized with a booelan privacy setting and a string name')
      }

      // The official API error is that slugs must be alphanumeric with underscore, dot, and dash, lowercase, and
      // no whitespace. Most things convert to dashes with Atlassian's secret converter but apostophes just disappear
      // (here I've assumed quotes are the same).
      // There are additional constraints not provided in the error message nor documented anywhere that can only be
      // found by trial and error. Among these are: no consecutive dashes except in some weird trivial edge cases
      // (i.e. all dashes, which we won't worry about), no ending in a dash, and very likely no starting in a dash.
      const repoSlug = repo.name
        .replace(/['"]/g, '')
        .replace(/\W/g, '-')
        .replace(/--+/g, '-')
        .replace(/^-/, '')
        .replace(/-$/, '')
        .toLowerCase()

      validateArgs('create', arguments)
      const uri = buildUri(username, repoSlug)
      api.post(
        uri,
        repo, null,
        result.$createListener(callback)
      )
    },

    /**
     * Create a new pull request
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo.
     * @param {Object} pullRequest The PR POST body as specified by Bitbucket's API documentation
     */
    createPullRequest(username, repoSlug, pullRequest, callback) {
      validateArgs('createPullRequest', arguments, 3)
      const uri = buildUri(username, repoSlug, 'pullrequests')
      api.post(
        uri,
        pullRequest, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get the info for a single repo
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo.
     */
    get(username, repoSlug, callback) {
      validateArgs('get', 2, arguments)
      const uri = buildUri(username, repoSlug)
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Commit files to a user repo
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo.
     * @param {Object} params including files to commit
     * @param {Object} to control request send such as the contentType
     *
     * File content can be either textual/binary (for multipart/form-data)
     * or a path to a file on disk
     * Can also be called: commit(username, repoSlug, files, callback)
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/src#post
     */
    commit(username, repoSlug, params, callback) {
      validateArgs('commit', arguments, 3)
      const uri = buildUri(username, repoSlug, 'src')
      api.postForm(
        uri,
        params,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Get the branch info for a single repo
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo.
     */
    getBranches(username, repoSlug, callback) {
      validateArgs('getBranches', arguments)
      const uri = buildUri(username, repoSlug, 'refs', 'branches')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get a single commit
     * @param {String} repo owner
     * @param {String} slug (name) of the repo.
     * @param {String} revision of the commit
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Brevision%7D
     */
    getCommit(username, repoSlug, revision, callback) {
      validateArgs('getCommit', arguments, 3)
      const uri = buildUri(username, repoSlug, 'commit', revision)
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get the pull requests for a single repo
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo.
     * @param {constants.pullRequest.states or Array thereof} The PR state. If invalid or undefined, defaults to OPEN
     */
    getPullRequests(username, repoSlug, state, callback) {
      let stateArray = state
      if (!stateArray) {
        stateArray = [constants.pullRequest.states.OPEN]
      } else if (!_.isArray(stateArray)) {
        stateArray = [stateArray]
      }

      const hasInvalidState = _.find(state, stateElement => !_.includes(constants.pullRequest.states, stateElement))
      if (hasInvalidState) {
        stateArray = [constants.pullRequest.states.OPEN]
      }

      const apiParameters = {
        state: stateArray.join(',')
      }
      validateArgs('getPullRequests', arguments, 3)
      const uri = buildUri(username, repoSlug, 'pullrequests')
      api.get(
        uri,
        apiParameters, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get the repositories of a user
     *
     * @param {String}  username
     */
    getByUser(username, callback) {
      validateArgs('getByUser', arguments, 1)
      const uri = buildUri(username)
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get the repositories of a team
     *
     * @param {String}  teamname
     */
    getByTeam(teamname, callback) {
      validateArgs('getByTeam', arguments, 1)
      const uri = buildUri(teamname)
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get the forks for a repo
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo.
     */
    getForks(username, repoSlug, callback) {
      validateArgs('getForks', arguments)
      const uri = buildUri(username, repoSlug, 'forks')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get the forks for a repo using an API response that has repository links
     *
     * @param {Object} API response
     */
    getForksFromResponse(response, callback) {
      const prebuiltURL = response && response.links && response.links.forks && response.links.forks.href

      if (!prebuiltURL) {
        throw new Error('getForksFromResponse: argument has no \'forks\' url.')
      }
      validateArgs('getForksFromResponse', arguments, 1)
      api.request.doPrebuiltSend(
        prebuiltURL,
        result.$createListener(callback)
      )
    },

    /**
     * Get the parent for a repo using an API response that has repository links.
     * This should only be called after a check to hasParent().
     *
     * @param {Object} API response
     */
    getParentFromResponse(response, callback) {
      const prebuiltURL = _.get(response, 'parent.links.self.href')

      if (!prebuiltURL) {
        throw new Error(
          'getForksFromResponse: argument has no \'parent\' info. Call hasParent first to guard this method call.'
        )
      }
      validateArgs('getParentFromResponse', arguments, 1)
      api.request.doPrebuiltSend(
        prebuiltURL,
        result.$createListener(callback)
      )
    },

    /**
     * Determines whether or not the given response has an accessible parent.
     *
     * @param {Object} API response
     * @return {boolean} true if the argument has an associated "parent" (i.e. the response is a fork), false otherwise.
     */
    hasParent(response) {
      return !!response.parent
    }
  }

  // return fluid api
  // experimental
  localApi.forProject = fluid(localApi, 2)
  localApi.promised = createPromisedApi(localApi, opts)
  return _.assign(result, localApi)
};

module.exports = {
  createApi,
  methods: [
    'create',
    'createPullRequest',
    'get',
    'commit',
    'getBranches',
    'getCommit',
    'getPullRequest',
    'getByUser',
    'getByTeam',
    'getForks',
    'getForksFromResponse',
    'getParentFromResponse',
    'hasParent'
  ]
}
