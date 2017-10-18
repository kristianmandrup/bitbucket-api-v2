const _ = require('lodash')
const {
  createPromisedApi
} = require('../promised')

const AbstractApi = require('../abstract_api')

/**
 * API doc: https://developer.atlassian.com/bitbucket/api/2/reference/
 * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit
 */
module.exports = function PipelineConfigApi(api, opts = {}) {
  const result = AbstractApi(api, opts)

  function buildUri(username, repoSlug, action) {
    const baseUri = `repositories/${encodeURI(username)}/${encodeURI(repoSlug)}`
    return action ? [baseUri, action].join('/') : baseUri
  }

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
      const uri = buildUri(username, repoSlug, '/pipelines_config')
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
      const uri = buildUri(username, repoSlug, '/pipelines_config')
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
      const uri = buildUri(username, repoSlug, '/pipelines_config/build_number')
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
      const uri = buildUri(username, repoSlug, '/pipelines_config/schedules')
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
      const uri = buildUri(username, repoSlug, '/pipelines_config/schedules')
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
      const uri = buildUri(username, repoSlug, `/pipelines_config/schedules/${scheduleId}`)
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
      const uri = buildUri(username, repoSlug, `/pipelines_config/schedules/${scheduleId}/executions`)
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
      const uri = buildUri(username, repoSlug, `/pipelines_config/schedules/${scheduleId}`)
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
      const uri = buildUri(username, repoSlug, `/pipelines_config/schedules/${scheduleId}`)
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
