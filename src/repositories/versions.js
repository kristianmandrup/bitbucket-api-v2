const _ = require('lodash')
const {
  createPromisedApi
} = require('../promised')

const fluid = require('../fluid')
const AbstractApi = require('../abstract_api')

/**
 * API doc: https://developer.atlassian.com/bitbucket/api/2/reference/
 * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit
 */
module.exports = function VersionsApi(api, opts = {}) {
  const result = AbstractApi(api, opts)

  function buildUri(username, repoSlug, action) {
    const baseUri = `repositories/${encodeURI(username)}/${encodeURI(repoSlug)}`
    return action ? [baseUri, action].join('/') : baseUri
  }

  const localApi = {
    /**
     * Get the versions of repo issue tracker
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo.
     */
    getAll(username, repoSlug, callback) {
      const uri = buildUri(username, repoSlug, 'versions')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get a versions of repo issue tracker
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo.
     */
    get(username, repoSlug, version_id, callback) {
      const uri = buildUri(username, repoSlug, `versions/${version_id}`)
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    }
  }

  localApi.forProject = fluid(localApi, 2)
  localApi.promised = createPromisedApi(localApi, opts)
  return _.assign(result, localApi)
}
