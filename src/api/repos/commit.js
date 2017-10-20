const {
  _,
  fluid,
  createPromisedApi,
  createAbstractApi
} = require('../_base')

/**
 * API doc: https://developer.atlassian.com/bitbucket/api/2/reference/
 * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit
 */
function createApi(api, opts = {}) {
  const result = createAbstractApi(api, opts)

  function buildUri(username, repoSlug, action) {
    const baseUri = `repositories/${encodeURI(username)}/${encodeURI(repoSlug)}/commit/{node}`
    return action ? [baseUri, action].join('/') : baseUri
  }

  const localApi = {
    /**
     * Approve the commit
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} node (sha1) of the commit
     *
     * See: /repositories/{username}/{repo_slug}/commit/{node}/approve
     */
    approve(username, repoSlug, node, callback) {
      const uri = buildUri(username, repoSlug, node, 'approve')
      api.post(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * disApprove the commit (ie. delete former approval)
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} node (sha1) of the commit
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D/approve#delete
     */
    disApprove(username, repoSlug, node, callback) {
      const uri = buildUri(username, repoSlug, node, 'approve')
      api.delete(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * build statuses of the commit
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} node (sha1) of the commit
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D/statuses
     */
    getBuildStatuses(username, repoSlug, node, callback) {
      const uri = buildUri(username, repoSlug, node, 'statuses')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * create new build from commit
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} node (sha1) of the commit
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D/statuses/build
     */
    createBuild(username, repoSlug, node, callback) {
      const uri = buildUri(username, repoSlug, node, 'statuses/build')
      api.post(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get build status of commit
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} node (sha1) of the commit
     * @param {String} key  (unique key)
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D/statuses/build/%7Bkey%7D
     */
    getBuildStatus(username, repoSlug, node, key, callback) {
      const uri = buildUri(username, repoSlug, node, `statuses/build/${key}`)
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get a comments of commit
     * @param {String} repo owner
     * @param {String} slug (name) of the repo.
     * @param {String} sha of the commit
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bsha%7D
     */
    getComments(username, repoSlug, sha, callback) {
      const uri = buildUri(username, repoSlug, `commit/${sha}/comments`)
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get a comments of commit
     * @param {String} repo owner
     * @param {String} slug (name) of the repo.
     * @param {String} sha of the commit
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bsha%7D
     */
    getComment(username, repoSlug, sha, commentId, callback) {
      const uri = buildUri(username, repoSlug, `commit/${sha}/comments/${commentId}`)
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    }
  }

  localApi.forProject = fluid(localApi, 2)
  localApi.forProjectNode = fluid(localApi, 3)
  localApi.forProjectNode = fluid(localApi, 4)
  localApi.promised = createPromisedApi(localApi, opts)
  return _.assign(result, localApi)
}

module.exports = {
  createApi,
  methods: [
    'approve',
    'disApprove',
    'getBuildStatuses',
    'createBuild',
    'getBuildStatus',
    'createBuild',
    'getComments',
    'getComment',
  ]
}
