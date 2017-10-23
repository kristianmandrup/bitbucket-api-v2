const {
  _,
  uriBuilder,
  validateArgs,
  fluid,
  createPromisedApi,
  createAbstractApi
} = require('./_base')

/**
 * API docs:
 * https://developer.atlassian.com/bitbucket/api/2/reference/resource/users/
 *
 */
function createApi(api, opts = {}) {
  const result = createAbstractApi(api, opts = {})

  const buildUri = uriBuilder('users')

  let localApi = {
    name: 'Users',

    /**
     * Get user by username
     * @param {String} username
     *
     * https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/users/%7Busername%7D
     */
    get(username, callback) {
      validateArgs('get', arguments, 1)
      const uri = buildUri(username)
      api.get(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Get followers of user
     * @param {String} username
     *
     * https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/users/%7Busername%7D
     */
    getFollowers(username, callback) {
      validateArgs('getFollowers', arguments, 1)
      const uri = buildUri(username, 'followers')
      api.get(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Get following of user
     * @param {String} username
     *
     * https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/users/%7Busername%7D
     */
    getFollowing(username, callback) {
      validateArgs('getFollowing', arguments, 1)
      const uri = buildUri(username, 'following')
      api.get(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Get web hooks of user
     * @param {String} username
     *
     * https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/users/%7Busername%7D
     */
    getWebHooks(username, callback) {
      validateArgs('getWebHooks', arguments, 1)
      const uri = buildUri(username, 'hooks')
      api.get(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Get web hook of user
     * @param {String} username
     *
     * https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/users/%7Busername%7D
     */
    getWebHook(username, hookId, callback) {
      validateArgs('getWebHook', arguments, 2)
      const uri = buildUri(username, 'hooks', hookId)
      api.get(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },
    /**
     * Remove web hook of user
     * @param {String} username
     *
     * https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/users/%7Busername%7D
     */
    removeWebHook(username, hookId, callback) {
      validateArgs('removeWebHook', arguments, 2)
      const uri = buildUri(username, 'hooks', hookId)
      api.delete(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Remove web hook of user
     * @param {String} username
     *
     * https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/users/%7Busername%7D
     */
    updateWebHook(username, hookId, hook, callback) {
      validateArgs('updateWebHook', arguments, 3)
      const uri = buildUri(username, 'hooks', hookId)
      const data = {
        _body: hook
      }
      api.put(
        uri,
        data,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Retrieve user level variables
     * @param {String} username
     *
     * https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/users/%7Busername%7D
     */
    getPipelineConfigVars(username, callback) {
      validateArgs('getPipelineConfigVars', arguments, 1)
      const uri = buildUri(username, 'pipelines_config', 'variables')
      api.get(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Retrieve a user level variable.
     * @param {String} username
     * @param {String} variableId (uuid)
     *
     * https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/users/%7Busername%7D
     */
    getPipelineConfigVar(username, variableId, callback) {
      validateArgs('getPipelineConfigVar', arguments, 2)
      const uri = buildUri(username, 'pipelines_config', 'variables', variableId)
      api.get(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Remove a user level variable.
     * @param {String} username
     * @param {String} variableId (uuid)
     *
     * https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/users/%7Busername%7D
     */
    removePipelineConfigVar(username, variableId, callback) {
      validateArgs('removePipelineConfigVar', arguments, 2)
      const uri = buildUri(username, 'pipelines_config', 'variables', variableId)
      api.delete(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Remove a user level variable.
     * @param {String} username
     * @param {String} variableId (uuid)
     * @param {Object} variable
     *
     * https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/users/%7Busername%7D
     */
    updatePipelineConfigVar(username, variableId, variable, callback) {
      validateArgs('updatePipelineConfigVar', arguments, 3)
      const uri = buildUri(username, 'pipelines_config', 'variables', variableId)
      const data = {
        _body: variable
      }
      api.put(
        uri,
        data,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Retrieve all repositories owned by a user/team. This includes private repositories, but filtered down to the ones that the calling user has access to.
     * @param {String} username
     *
     * https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/users/%7Busername%7D
     */
    getRepositories(username, callback) {
      validateArgs('getRepositories', arguments, 1)
      const uri = buildUri(username, 'repositories')
      api.get(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    }
  }

  localApi.forUser = fluid(localApi, 1)
  localApi.promised = createPromisedApi(localApi, opts)
  return _.assign(result, localApi)
}

module.exports = {
  createApi,
  methods: [
    'get',
    'getFollowers',
    'getFollowing',
    'getWebHooks',
    'getWebHook',
    'removeWebHook',
    'updateWebHook',
    'getPipelineConfigVars',
    'getPipelineConfigVar',
    'removePipelineConfigVar',
    'updatePipelineConfigVar',
    'getRepositories'
  ]
}
