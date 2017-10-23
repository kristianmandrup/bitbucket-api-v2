const {
  _,
  uriBuilder,
  validateArgs,
  createPromisedApi,
  createAbstractApi
} = require('./_base')
/**
 * API docs: https://developer.atlassian.com/bitbucket/api/2/reference/
 * resource/hook_events
 */
function createApi(api, opts = {}) {
  const result = createAbstractApi(api, opts = {})
  const buildUri = uriBuilder('hook_events')

  let localApi = {
    name: 'HookEvents',

    /**
     * Returns the webhook resource or subject types on which webhooks can be registered.
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/addon#delete
     */
    get(callback) {
      const uri = buildUri()
      api.get(
        uri,
        null,
        null,
        result.$createListener(callback)
      )
    },

    /**
     * Returns a paginated list of all valid webhook events for the specified entity.
     * This is public data that does not require any scopes or authentication.
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/hook_events/%7Bsubject_type%7D
     */
    forSubject(subjectType, callback) {
      validateArgs('forSubject', arguments, 1)
      const uri = buildUri(subjectType)
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

module.exports = {
  createApi,
  methods: [
    'get',
    'forSubject'
  ]
}
