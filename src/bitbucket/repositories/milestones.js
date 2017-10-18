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
module.exports = function MilestonesApi(api, opts = {}) {
  const result = AbstractApi(api, opts)

  function buildUri(username, repoSlug, action) {
    const baseUri = `repositories/${encodeURI(username)}/${encodeURI(repoSlug)}`
    return action ? [baseUri, action].join('/') : baseUri
  }

  const localApi = {

    /**
     * get all milestones
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commits
     */
    getAll(username, repoSlug, callback) {
      const uri = buildUri(username, repoSlug, 'milestones')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * get all milestones
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commits
     */
    get(username, repoSlug, milestoneId, callback) {
      const uri = buildUri(username, repoSlug, `milestones/${milestoneId}`)
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
