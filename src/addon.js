const _ = require('lodash')
const {
  createPromisedApi
} = require('./promised')

const AbstractApi = require('./abstract_api')

/**
 * API docs: https://developer.atlassian.com/bitbucket/api/2/reference/resource/addon
 */
module.exports = function AddonApi(api, opts = {}) {
  const result = AbstractApi(api, opts = {})

  function buildUri(owner, action) {
    const baseUri = `teams/${owner}`
    return action ? [baseUri, action].join('/') : baseUri
  }

  let localApi = {
    name: 'Addon',

    /**
     * Remove addon
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/addon#delete
     */
    remove(callback) {
      const uri = 'addon'
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
      const uri = 'addon'
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
