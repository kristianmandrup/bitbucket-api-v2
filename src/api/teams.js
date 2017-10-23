const {
  _,
  uriBuilder,
  validateArgs,
  fluid,
  createPromisedApi,
  createAbstractApi
} = require('./_base')

/**
 * API docs: https://confluence.atlassian.com/bitbucket/teams-endpoint-423626335.html
 */
function createApi(api, opts = {}) {
  const result = createAbstractApi(api, opts = {})
  const buildUri = uriBuilder('teams')

  let localApi = {
    name: 'Teams',
    /**
     * Get the teams for the authenticated user
     *
     * @param {String} role (default: member)
     */
    get(role = 'member', callback) {
      validateArgs('get', arguments, 1)
      const uri = buildUri()
      api.get(
        uri, {
          role
        },
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Get the projects for the team of authenticated user
     *
     * @param {String} owner of team
     */
    getProjects(owner, callback) {
      validateArgs('getProjects', arguments, 1)
      const uri = buildUri(owner, 'projects')
      api.get(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Add project to the team of authenticated user
     *
     * @param {String} owner of team
     * @param {Object} project to add
     */
    addProject(owner, project, callback) {
      validateArgs('addProject', arguments, 2)
      const uri = buildUri(owner, 'projects')
      api.post(
        uri,
        project,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Get specific project from team of authenticated user
     *
     * @param {String} owner of team
     * @param {String} projectId (id) of project
     */
    getProject(owner, projectId, callback) {
      validateArgs('getProject', arguments, 2)
      const uri = buildUri(owner, 'projects', projectId)
      api.get(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Get specific project from team of authenticated user
     *
     * @param {String} owner of team
     * @param {String} projectId (id) of project
     * @param {Object} project to add
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/teams/%7Bowner%7D/projects/%7Bproject_key%7D#put
     * Data format expected: https://developer.atlassian.com/bitbucket/api/2/reference/resource/teams/%7Bowner%7D/projects/#post
     */
    updateProject(owner, projectId, project, callback) {
      validateArgs('updateProject', arguments, 3)
      const uri = buildUri(owner, 'projects', projectId)
      api.put(
        uri,
        project,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Remove specific project from team of authenticated user
     *
     * @param {String} owner of team
     * @param {String} projectId (id) of project
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/teams/%7Bowner%7D/projects/%7Bproject_key%7D#put
     * Data format expected: https://developer.atlassian.com/bitbucket/api/2/reference/resource/teams/%7Bowner%7D/projects/#post
     */
    removeProject(owner, projectId, callback) {
      validateArgs('removeProject', arguments, 2)
      const uri = buildUri(owner, 'projects', projectId)
      api.delete(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Get public info project from team of authenticated user
     *
     * @param {String} username of user
     */
    getUserInfo(username, callback) {
      validateArgs('getUserInfo', arguments, 1)
      const uri = buildUri(username)
      api.get(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    // TODO: Reuse same API as for UsersApi
  }
  localApi.forOwner = fluid(localApi, 1)
  localApi.forProject = fluid(localApi, 2)
  localApi.promised = createPromisedApi(localApi, opts)
  return _.assign(result, localApi)
}

module.exports = {
  createApi,
  methods: [
    'get',
    'getProjects',
    'addProject',
    'getProject',
    'updateProject',
    'removeProject',
    'getUserInfo'
  ]
}
