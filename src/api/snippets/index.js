const {
  _,
  fluid,
  uriBuilder,
  createPromisedApi,
  createAbstractApi
} = require('../_base')

/**
 * API docs: https://confluence.atlassian.com/bitbucket/teams-endpoint-423626335.html
 */
function createApi(api, opts = {}) {
  const result = createAbstractApi(api, opts = {})

  const buildUri = uriBuilder('snippets')

  let localApi = {
    name: 'Snippets',
    /**
     * Returns all snippets. Like pull requests, repositories and teams, the full set of snippets
     * is defined by what the current user has access to.
     * This includes all snippets owned by the current user, but also all snippets owned by any
     * of the teams the user is a member of, or snippets by other users that the current user is either watching or has collaborated on
     * (for instance by commenting on it).
     * To limit the set of returned snippets, apply the ?role=[owner|contributor|member] query parameter where the
     * roles are defined as follows:
     *   - owner: all snippets owned by the current user
     *   - contributor: all snippets owned by, or watched by the current user
     *   - member: owned by the user, their teams, or watched by the current user
     *   - When no role is specified, all public snippets are returned, as well as all privately owned snippets watched or commented on.
     */
    get(callback) {
      const uri = buildUri()
      api.get(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Creates a new snippet under the authenticated user's account.
     * Snippets can contain multiple files. Both text and binary files are supported.
     *
     * @param {String} files to add
     *
     * using multipart/form
     */
    create(files, callback) {
      const uri = buildUri()
      const data = {
        files
      }
      api.postForm(
        uri,
        data,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Creates a new snippet under the authenticated user's account.
     * Snippets can contain multiple files. Both text and binary files are supported.
     *
     * @param {String} data to add including files (can include meta data)
     *
     * using multipart/related
     */
    createWithMeta(data, callback) {
      const uri = buildUri()
      api.postRelated(
        uri,
        data,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Get snippets of a user
     * Identical to /snippets, except that the result is further filtered by
     * the snippet owner and only those that are owned by {username} are returned.
     *
     * @param {String} username of user
     *
     * See https://developer.atlassian.com/bitbucket/api/2/reference/resource/snippets/%7Busername%7D
     */
    getFor(username, callback) {
      const uri = buildUri(username)
      api.get(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },
    /**
     * Creates a snippet for a user
     * Identical to /snippets, except that the new snippet
     * will be created under the account specified in the path parameter {username}.
     *
     * @param {String} username of user
     */
    createSnippetFor(username, snippet, callback) {
      const uri = buildUri(username)
      api.get(
        uri,
        snippet,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Get a user snippet
     *
     * @param {String} username of user
     * @param {String} snippetId (encoded) of snippet
     */
    getSnippetFor(username, snippetId, callback) {
      const uri = buildUri(username, snippetId)
      api.get(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },
    /**
     * Update a user snippet
     *
     * @param {String} username of user
     * @param {String} snippetId (encoded) of snippet
     *
     * Uses multipart/form-data to manipulate file contents and meta data atomically.
     */
    updateSnippetFor(username, snippetId, snippet, callback) {
      const uri = buildUri(username, snippetId)
      api.updateForm(
        uri,
        snippet,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Remove a user snippet
     *
     * @param {String} username of user
     * @param {String} snippetId (encoded) of snippet
     */
    removeSnippetFor(username, snippetId, callback) {
      const uri = buildUri(username, snippetId)
      api.delete(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Get the user snippet comments
     *
     * @param {String} username of user
     * @param {String} snippetId (encoded) of snippet
     */
    getSnippetCommentsFor(username, snippetId, callback) {
      const uri = buildUri(username, snippetId, 'comments')
      api.get(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Add a comment to a user snippet
     *
     * @param {String} username of user
     * @param {String} snippetId (encoded) of snippet
     * @param {String} comment to add
     *
     * To create a threaded reply to an existing comment, include parent.id.
     */
    addSnippetCommentFor(username, snippetId, comment, callback) {
      const uri = buildUri(username, snippetId, 'comments')
      api.post(
        uri,
        comment,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Get the user snippet commits
     *
     * @param {String} username of user
     * @param {String} snippetId (encoded) of snippet
     */
    getSnippetCommitsFor(username, snippetId, callback) {
      const uri = buildUri(username, snippetId, 'commits')
      api.get(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Check if user snippet is being watched
     *
     * @param {String} username of user
     * @param {String} snippetId (encoded) of snippet
     */
    isSnippetWatchedFor(username, snippetId, callback) {
      const uri = buildUri(username, snippetId, 'watch')
      api.get(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Watch a user snippet
     *
     * @param {String} username of user
     * @param {String} snippetId (encoded) of snippet
     */
    watchSnippetFor(username, snippetId, callback) {
      const uri = buildUri(username, snippetId, 'watch')
      api.put(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Stop watching a user snippet
     *
     * @param {String} username of user
     * @param {String} snippetId (encoded) of snippet
     */
    stopWatchingSnippetFor(username, snippetId, callback) {
      const uri = buildUri(username, snippetId, 'watch')
      api.delete(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Check if user snippet is being watched
     *
     * @param {String} username of user
     * @param {String} snippetId (encoded) of snippet
     */
    getSnippetWatchersFor(username, snippetId, callback) {
      const uri = buildUri(username, snippetId, 'watchers')
      api.get(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },
  }

  localApi.promised = createPromisedApi(localApi, opts)
  return _.assign(result, localApi)
}

module.exports = {
  createApi,
  methods: [
    'get',
    'create',
    'createWithMeta',
    'getFor',
    'createSnippetFor',
    'getSnippetFor',
    'updateSnippetFor',
    'removeSnippetFor',
    'getSnippetCommentsFor',
    'addSnippetCommentFor',
    'isSnippetWatchedFor',
    'watchSnippetFor',
    'stopWatchingSnippetFor',
    'getSnippetWatchersFor'
  ]
}
