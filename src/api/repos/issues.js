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
     * Create new issue
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/pipelines/#post
     */
    create(username, repoSlug, callback) {
      validateArgs('create', arguments, 2)
      const uri = buildUri(username, repoSlug, 'issues')
      api.post(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get all issues
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D/statuses
     */
    getAll(username, repoSlug, callback) {
      validateArgs('getAll', arguments, 2)
      const uri = buildUri(username, repoSlug, 'issues')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get issue
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} issue (uuid)
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D/statuses
     */
    get(username, repoSlug, issue_id, callback) {
      validateArgs('get', arguments, 3)
      const uri = buildUri(username, repoSlug, issue_id)
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },


    /**
     * Delete issue
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} issue (uuid)
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/issues/%7Bissue_id%7D/attachments
     */
    remove(username, repoSlug, issue_id, callback) {
      validateArgs('remove', arguments, 3)
      const uri = buildUri(username, repoSlug, issue_id)
      api.delete(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get issue attachments
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} issue (uuid)
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D/statuses
     */
    getAttachments(username, repoSlug, issue_id, callback) {
      validateArgs('getAttachments', arguments, 3)
      const uri = buildUri(username, repoSlug, issue_id, 'attachments')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get attachment of issues by path
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} issue (uuid)
     * @param {String} path of issue attachment
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D/statuses
     */
    getAttachment(username, repoSlug, issue_id, path, callback) {
      validateArgs('getAttachment', arguments, 4)
      const uri = buildUri(username, repoSlug, issue_id, 'attachments/${path}')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Upload new issue attachments.
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} issue (uuid)
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D/statuses
     */
    uploadAttachments(username, repoSlug, issue_id, attachments, callback) {
      validateArgs('uploadAttachments', arguments, 4)
      const uri = buildUri(username, repoSlug, issue_id, 'attachments')
      api.postForm(
        uri,
        attachments,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Get issue comments
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} issue (uuid)
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D/statuses
     */
    getComments(username, repoSlug, issue_id, callback) {
      validateArgs('getComments', arguments, 3)
      const uri = buildUri(username, repoSlug, issue_id, 'comments')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get attachment of issues by path
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} issue (uuid)
     * @param {String} path of issue attachment
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D/statuses
     */
    getComment(username, repoSlug, issue_id, commentId, callback) {
      validateArgs('getComment', arguments, 4)
      const uri = buildUri(username, repoSlug, issue_id, 'comments/${commentId}')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Check if has voted (by me)
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} issue (uuid)
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/issues/%7Bissue_id%7D/vote
     */
    hasVoted(username, repoSlug, issue_id, callback) {
      validateArgs('hasVoted', arguments, 3)
      const uri = buildUri(username, repoSlug, issue_id, 'vote')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Vote for issue
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} issue (uuid)
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/issues/%7Bissue_id%7D/vote#put
     */
    vote(username, repoSlug, issue_id, callback) {
      validateArgs('vote', arguments, 3)
      const uri = buildUri(username, repoSlug, issue_id, 'vote')
      api.put(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Retract vote for issue
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} issue (uuid)
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/issues/%7Bissue_id%7D/vote#put
     */
    retractVote(username, repoSlug, issue_id, callback) {
      validateArgs('retractVote', arguments, 3)
      const uri = buildUri(username, repoSlug, issue_id, 'vote')
      api.delete(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },


    /**
     * Check if issue is being watched (by me)
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} issue (uuid)
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/issues/%7Bissue_id%7D/vote
     */
    isWatched(username, repoSlug, issue_id, callback) {
      validateArgs('isWatched', arguments, 3)
      const uri = buildUri(username, repoSlug, issue_id, 'watch')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Vote for issue
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} issue (uuid)
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/issues/%7Bissue_id%7D/vote#put
     */
    watch(username, repoSlug, issue_id, callback) {
      validateArgs('watch', arguments, 3)
      const uri = buildUri(username, repoSlug, issue_id, 'watch')
      api.put(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Stop watching issue
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} issue (uuid)
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/issues/%7Bissue_id%7D/vote#put
     */
    stopWatch(username, repoSlug, issue_id, callback) {
      validateArgs('stopWatch', arguments, 3)
      const uri = buildUri(username, repoSlug, issue_id, 'watch')
      api.delete(
        uri,
        null, null,
        result.$createListener(callback)
      )
    }
  }

  localApi.forProject = fluid(localApi, 2)
  localApi.forRepo = localApi.forProject // alias
  localApi.forIssue = fluid(localApi, 3)
  localApi.promised = createPromisedApi(localApi, opts)
  return _.assign(result, localApi)
}

module.exports = {
  createApi,
  methods: [
    'getAll',
    'create',
    'get',
    'remove',
    'getAttachments',
    'getAttachment',
    'uploadAttachments',
    'getComments',
    'getComment',
    'hasVoted',
    'vote',
    'retractVote',
    'isWatched',
    'watch',
    'stopWatch'
  ]
}
