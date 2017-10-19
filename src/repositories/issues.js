const _ = require('lodash')
const {
  createPromisedApi
} = require('../promised')

const fluid = require('../fluid')
const AbstractApi = require('../abstract_api')

/**
 * API doc: https://developer.atlassian.com/bitbucket/api/2/reference/
 * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit
 */
module.exports = function IssuesApi(api, opts = {}) {
  const result = AbstractApi(api, opts)

  function buildUri(username, repoSlug, action) {
    const baseUri = `repositories/${encodeURI(username)}/${encodeURI(repoSlug)}`
    return action ? [baseUri, action].join('/') : baseUri
  }

  function buildLongUri(username, repoSlug, issue_id, action) {
    return buildUri(username, repoSlug, `/issues/{issue_id}/${action}`)
  }

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
      const uri = buildLongUri(username, repoSlug, issue_id)
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
      const uri = buildLongUri(username, repoSlug, issue_id)
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
      const uri = buildLongUri(username, repoSlug, issue_id, 'attachments')
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
      const uri = buildLongUri(username, repoSlug, issue_id, 'attachments/${path}')
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
    uploadAttachments(username, repoSlug, issue_id, attachments, options, callback) {
      const uri = buildLongUri(username, repoSlug, issue_id, 'attachments')
      if (typeof options === 'function') {
        callback = options
        options = null
      }
      const defaultOpts = {
        contentType: 'multipart/form-data'
      }
      api.post(
        uri,
        attachments, options || defaultOpts,
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
      const uri = buildLongUri(username, repoSlug, issue_id, 'comments')
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
      const uri = buildLongUri(username, repoSlug, issue_id, 'comments/${commentId}')
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
      const uri = buildLongUri(username, repoSlug, issue_id, 'vote')
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
      const uri = buildLongUri(username, repoSlug, issue_id, 'vote')
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
      const uri = buildLongUri(username, repoSlug, issue_id, 'vote')
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
      const uri = buildLongUri(username, repoSlug, issue_id, 'watch')
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
      const uri = buildLongUri(username, repoSlug, issue_id, 'watch')
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
      const uri = buildLongUri(username, repoSlug, issue_id, 'vote')
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
