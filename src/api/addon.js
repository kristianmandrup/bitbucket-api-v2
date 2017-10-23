const {
  _,
  buildUri,
  validateArgs,
  createPromisedApi,
  createAbstractApi
} = require('./_base')

/**
 * API docs: https://developer.atlassian.com/bitbucket/api/2/reference/resource/addon
 */
function createApi(api, opts = {}) {
  const result = createAbstractApi(api, opts = {})

  let localApi = {
    name: 'Addon',

    /**
     * Remove addon
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/addon#delete
     */
    remove(callback) {
      const uri = buildUri('addon')
      api.delete(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Update addon
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/addon#delete
     */
    update(addon, callback) {
      const uri = buildUri('addon')
      api.put(
        uri,
        addon,
        null,
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
    'remove',
    'update'
  ]
}
