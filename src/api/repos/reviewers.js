const {
  _,
  log,
  handleError,
  buildUri,
  fluid,
  createPromisedApi,
  createAbstractApi,
  validateArgs
} = require('./_base')

/**
 * API doc: https://developer.atlassian.com/bitbucket/api/2/reference/
 * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit
 */
function createApi(api, opts = {}) {
  const result = createAbstractApi(api, opts)

  const localApi = {

    /**
     * get all reviewers
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commits
     */
    getAll(username, repoSlug, callback) {
      validateArgs('getAll', arguments, 2)
      const uri = buildUri(username, repoSlug, 'default-reviewers')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get details of a reviewer
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} reviewerName (username) of target reviewer
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/default-reviewers/%7Btarget_username%7D
     */
    get(username, repoSlug, reviewerName, callback) {
      validateArgs('get', arguments, 3)
      const uri = buildUri(username, repoSlug, 'default-reviewers', reviewerName)
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },
    /**
     * Add a reviewer by name
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} reviewerName (username) of target reviewer
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/default-reviewers/%7Btarget_username%7D
     */
    addReviewer(username, repoSlug, reviewerName, reviewer, callback) {
      validateArgs('addReviewer', arguments, 4)
      const uri = buildUri(username, repoSlug, 'default-reviewers', reviewerName)
      const data = reviewer
      api.put(
        uri,
        reviewer, null,
        result.$createListener(callback)
      )
    },

    /**
     * Remove a reviewer by name
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} reviewerName (username) of target reviewer
     * @param {Object} reviewer data
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/default-reviewers/%7Btarget_username%7D
     */
    removeReviewer(username, repoSlug, reviewerName, callback) {
      validateArgs('removeReviewer', arguments, 3)
      const uri = buildUri(username, repoSlug, 'default-reviewers', reviewerName)
      api.delete(
        uri,
        null, null,
        result.$createListener(callback)
      )
    }

  }

  localApi.promised = createPromisedApi(localApi, opts)
  return _.assign(result, localApi)
}

module.exports = {
  createApi,
  methods: [
    'getAll',
    'get',
    'addReviewer',
    'removeReviewer'
  ]
}
