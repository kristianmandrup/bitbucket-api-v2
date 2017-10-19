const _ = require('lodash')
const {
  createPromisedApi
} = require('./promised')

const AbstractApi = require('./abstract_api')

/**
 * API docs: https://developer.atlassian.com/bitbucket/api/2/reference/resource/hook_events
 */
module.exports = function HookEventsApi(api, opts = {}) {
  const result = AbstractApi(api, opts = {})

  function buildUri(owner, action) {
    const baseUri = `teams/${owner}`
    return action ? [baseUri, action].join('/') : baseUri
  }

  let localApi = {
    name: 'HookEvents',

    /**
     * Returns the webhook resource or subject types on which webhooks can be registered.
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/addon#delete
     */
    get(callback) {
      const uri = 'hook_events'
      api.get(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    }
  }

  localApi.promised = createPromisedApi(localApi, opts)
  return _.assign(result, localApi)
}
