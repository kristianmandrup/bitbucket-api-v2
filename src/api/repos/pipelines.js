const {
  _,
  log,
  handleError,
  buildUri,
  join,
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
     * Approve the commit
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/pipelines/#post
     */
    create(username, repoSlug, callback) {
      validateArgs('create', arguments, 2)
      const uri = buildUri(username, repoSlug, 'pipelines')
      api.post(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Find pipelines
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D/statuses
     */
    getAll(username, repoSlug, callback) {
      validateArgs('getAll', arguments, 2)
      const uri = buildUri(username, repoSlug, 'pipelines')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Find pipelines
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} pipeline (uuid) of the pipeline
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D/statuses
     */
    get(username, repoSlug, pipeline, callback) {
      validateArgs('get', arguments, 3)
      const uri = buildUri(username, repoSlug, pipeline)
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },


    /**
     * Stop pipeline
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} pipeline (uuid) of the pipeline
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D/statuses
     */
    stop(username, repoSlug, pipeline, callback) {
      validateArgs('stop', arguments, 3)
      const uri = buildUri(username, repoSlug, pipeline, 'stopPipeline')
      api.post(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     Get all steps for the given pipeline.
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} pipeline (uuid) of the pipeline
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D/statuses
     */
    getSteps(username, repoSlug, pipeline, callback) {
      validateArgs('getSteps', arguments, 3)
      const uri = buildUri(username, repoSlug, pipeline, 'steps')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },


    /**
     * Get a given step of a pipeline.
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} pipeline (uuid) of the pipeline
     * @param {String} step (uuid) of the step to find
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * /repositories/%7Busername%7D/%7Brepo_slug%7D/pipelines/%7Bpipeline_uuid%7D/steps/%7Bstep_uuid%7D
     */
    getStep(username, repoSlug, pipeline, step, stepUuid, callback) {
      validateArgs('getStep', arguments, 5)
      const uri = buildUri(username, repoSlug, pipeline, 'steps', stepUuid)
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get step log file for a given pipeline.
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} pipeline (uuid) of the pipeline
     * @param {String} step (uuid) of the step to find
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * /repositories/%7Busername%7D/%7Brepo_slug%7D/pipelines/%7Bpipeline_uuid%7D/steps/%7Bstep_uuid%7D/log
     */
    getStepLog(username, repoSlug, pipeline, step, stepUuid, callback) {
      validateArgs('getStepLog', arguments, 5)
      const uri = buildUri(username, repoSlug, pipeline, 'steps', stepUuid, 'log')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    }
  }

  localApi.forProject = fluid(localApi, 2)
  localApi.forPipeline = fluid(localApi, 3)
  localApi.promised = createPromisedApi(localApi, opts)
  return _.assign(result, localApi)
}

module.exports = {
  createApi,
  methods: [
    'get',
    'getAll',
    'create',
    'stop',
    'getSteps',
    'getStep'
  ]
}
