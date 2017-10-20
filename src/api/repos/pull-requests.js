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
    const baseUri = `repositories/${encodeURI(username)}/${encodeURI(repoSlug)}`
    return action ? [baseUri, action].join('/') : baseUri
  }

  const localApi = {

    /**
     * get all pull requests
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests
     */
    getAll(username, repoSlug, callback) {
      const uri = buildUri(username, repoSlug, 'pullrequests')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * create new pull requests
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} pullRequest description
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests
     *
     * data object:
     *  _body:	The new pull request.
     */
    create(username, repoSlug, pullRequest, callback) {
      const uri = buildUri(username, repoSlug, 'pullrequests')
      const data = {
        _body: pullRequest
      }
      api.post(
        uri, data, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get paginated list of all PR activitiy
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests
     */
    allActivity(username, repoSlug, callback) {
      const uri = buildUri(username, repoSlug, 'pullrequests/activity')
      api.get(
        uri, null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get activitiy of a PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/activity
     */
    getActivity(username, repoSlug, pr_id, callback) {
      const uri = buildUri(username, repoSlug, `pullrequests/${pr_id}/activity`)
      api.get(
        uri, null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Approve PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve
     */
    approve(username, repoSlug, pr_id, callback) {
      const uri = buildUri(username, repoSlug, `pullrequests/${pr_id}/approve`)
      api.post(
        uri, null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Disapprove PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve#delete
     */
    disApprove(username, repoSlug, pr_id, callback) {
      const uri = buildUri(username, repoSlug, `pullrequests/${pr_id}/approve`)
      api.delete(
        uri, null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get comments of a PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve#delete
     */
    getComments(username, repoSlug, pr_id, callback) {
      const uri = buildUri(username, repoSlug, `pullrequests/${pr_id}/comments`)
      api.get(
        uri, null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get comments of a PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     * @param {String} comment id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve#delete
     */
    getComment(username, repoSlug, pr_id, comment_id, callback) {
      const uri = buildUri(username, repoSlug, `pullrequests/${pr_id}/comments/${comment_id}`)
      api.get(
        uri, null, null,
        result.$createListener(callback)
      )
    },


    /**
     * Get paginated list of commits for PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve#delete
     */
    getCommits(username, repoSlug, pr_id, callback) {
      const uri = buildUri(username, repoSlug, `pullrequests/${pr_id}/commits`)
      api.get(
        uri, null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Decline PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve#delete
     */
    decline(username, repoSlug, pr_id, callback) {
      const uri = buildUri(username, repoSlug, `pullrequests/${pr_id}/decline`)
      api.post(
        uri, null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get diff of PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve#delete
     */
    getDiff(username, repoSlug, pr_id, callback) {
      const uri = buildUri(username, repoSlug, `pullrequests/${pr_id}/diff`)
      api.get(
        uri, null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Merge PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve#delete
     */
    merge(username, repoSlug, pr_id, callback) {
      const uri = buildUri(username, repoSlug, `pullrequests/${pr_id}/merge`)
      api.post(
        uri, null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Patch PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve#delete
     */
    patch(username, repoSlug, pr_id, callback) {
      const uri = buildUri(username, repoSlug, `pullrequests/${pr_id}/patch`)
      api.post(
        uri, null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Statuses of PR
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} PR id
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve#delete
     */
    statuses(username, repoSlug, pr_id, callback) {
      const uri = buildUri(username, repoSlug, `pullrequests/${pr_id}/statuses`)
      api.get(
        uri, null, null,
        result.$createListener(callback)
      )
    }
  }

  localApi.forProject = fluid(localApi, 2)
  localApi.promised = createPromisedApi(localApi, opts)
  return _.assign(result, localApi)
}

module.exports = {
  createApi,
  methods: [
    'getAll',
    'create',
    'allActivity',
    'getActivity',
    'approve',
    'disApprove',
    'getComments',
    'getComment',
    'getCommits',
    'decline',
    'getDiff',
    'merge',
    'patch',
    'statuses'
  ]
}
