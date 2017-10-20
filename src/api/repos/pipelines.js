const {
  _,
  fluid,
  createPromisedApi,
  createAbstractApi
} = '../_base'

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

  function buildLongUri(username, repoSlug, pipeline_uuid, action) {
    return buildUri(username, repoSlug, `/pipelines/${pipeline_uuid}/${action}`)
  }


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
      const uri = buildUri(username, repoSlug, '/pipelines')
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
      const uri = buildUri(username, repoSlug, '/pipelines')
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
      const uri = buildLongUri(username, repoSlug, pipeline)
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
      const uri = buildLongUri(username, repoSlug, pipeline, 'stopPipeline')
      api.post(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Find steps for the given pipeline.
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} pipeline (uuid) of the pipeline
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D/statuses
     */
    getSteps(username, repoSlug, pipeline, callback) {
      const uri = buildLongUri(username, repoSlug, pipeline, 'statuses')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },


    /**
     * Find a given pipeline.
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} pipeline (uuid) of the pipeline
     * @param {String} step (uuid) of the step to find
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit/%7Bnode%7D/statuses
     */
    getStep(username, repoSlug, pipeline, step, stepUuid, callback) {
      const uri = buildLongUri(username, repoSlug, pipeline, 'steps/{stepUuid}')
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
