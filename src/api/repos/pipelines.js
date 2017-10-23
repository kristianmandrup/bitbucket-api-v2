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
     * @param {String} pipelineId (uuid) of the pipeline
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D/statuses
     */
    get(username, repoSlug, pipelineId, callback) {
      validateArgs('get', arguments, 3)
      const uri = buildUri(username, repoSlug, pipelineId)
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
     * @param {String} pipelineId (uuid) of the pipeline
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D/statuses
     */
    stop(username, repoSlug, pipelineId, callback) {
      validateArgs('stop', arguments, 3)
      const uri = buildUri(username, repoSlug, pipelineId, 'stopPipeline')
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
     * @param {String} pipelineId (uuid) of the pipeline
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D/statuses
     */
    getSteps(username, repoSlug, pipelineId, callback) {
      validateArgs('getSteps', arguments, 3)
      const uri = buildUri(username, repoSlug, pipelineId, 'steps')
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
     * @param {String} pipelineId (uuid) of the pipeline
     * @param {String} stepId (uuid) of the step to find
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * /repositories/%7Busername%7D/%7Brepo_slug%7D/pipelines/%7Bpipeline_uuid%7D/steps/%7Bstep_uuid%7D
     */
    getStep(username, repoSlug, pipelineId, stepId, callback) {
      validateArgs('getStep', arguments, 5)
      const uri = buildUri(username, repoSlug, pipelineId, 'steps', stepId)
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
     * @param {String} pipelineId (uuid) of the pipeline
     * @param {String} stepId (uuid) of the step to find
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     * /repositories/%7Busername%7D/%7Brepo_slug%7D/pipelines/%7Bpipeline_uuid%7D/steps/%7Bstep_uuid%7D/log
     */
    getStepLog(username, repoSlug, pipelineId, stepId, callback) {
      validateArgs('getStepLog', arguments, 4)
      const uri = buildUri(username, repoSlug, pipelineId, 'steps', stepId, 'log')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    }
  }

  localApi.forProject = fluid(localApi, 2)
  localApi.forPipeline = fluid(localApi, 3)
  localApi.forPipelineStep = fluid(localApi, 4)
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
    'getStep',
    'getStepLog'
  ]
}
