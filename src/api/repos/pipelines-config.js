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
     * Get pipelines config
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commits
     */
    get(username, repoSlug, callback) {
      validateArgs('get', arguments, 2)
      const uri = buildUri(username, repoSlug, 'pipelines_config')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Update pipelines config
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commits
     *
     * _ body: The updated repository pipelines configuration.
     */
    update(username, repoSlug, config, callback) {
      validateArgs('update', arguments, 3)
      const uri = buildUri(username, repoSlug, 'pipelines_config')
      const data = {
        _body: config
      }
      api.put(
        uri,
        data, null,
        result.$createListener(callback)
      )
    },

    /**
     * Update the next build number that should be assigned to a pipeline.
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commits
     */
    nextBuildNumber(username, repoSlug, number, callback) {
      validateArgs('nextBuildNumber', arguments, 3)
      const uri = buildUri(username, repoSlug, 'pipelines_config/build_number')
      const data = {
        _body: number
      }
      api.put(
        uri,
        data, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get the configured schedules for the given repository
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commits
     */
    getSchedules(username, repoSlug, callback) {
      validateArgs('getSchedules', arguments, 2)
      const uri = buildUri(username, repoSlug, 'pipelines_config/schedules')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Create a schedule for the given repository.
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commits
     */
    createSchedule(username, repoSlug, schedule, callback) {
      validateArgs('createSchedule', arguments, 3)
      const uri = buildUri(username, repoSlug, 'pipelines_config/schedules')
      const data = {
        _body: schedule
      }
      api.post(
        uri,
        data, null,
        result.$createListener(callback)
      )
    },

    /**
     * Retrieve a schedule by its UUID.
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} schedule id (uuid)
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commits
     */
    getSchedule(username, repoSlug, scheduleId, callback) {
      validateArgs('getSchedule', arguments, 3)
      const uri = buildUri(username, repoSlug, `pipelines_config/schedules/${scheduleId}`)
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Retrieve a schedule by its UUID.
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} schedule id (uuid)
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commits
     */
    getScheduleExecutions(username, repoSlug, scheduleId, callback) {
      validateArgs('getScheduleExecutions', arguments, 3)
      const uri = buildUri(username, repoSlug, `pipelines_config/schedules/${scheduleId}/executions`)
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Update a schedule.
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} schedule id (uuid)
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commits
     */
    updateSchedule(username, repoSlug, scheduleId, callback) {
      validateArgs('updateSchedule', arguments, 3)
      const uri = buildUri(username, repoSlug, `pipelines_config/schedules/${scheduleId}`)
      api.put(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Delete a schedule.
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} schedule id (uuid)
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commits
     */
    deleteSchedule(username, repoSlug, scheduleId, callback) {
      validateArgs('deleteSchedule', arguments, 3)
      const uri = buildUri(username, repoSlug, 'pipelines_config/schedules', scheduleId)
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
    'get',
    'update',
    'nextBuildNumber',
    'getSchedules',
    'createSchedule',
    'getSchedule',
    'getScheduleExecutions',
    'updateSchedule',
    'deleteSchedule'
  ]
}
