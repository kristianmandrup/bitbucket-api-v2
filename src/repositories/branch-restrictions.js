const _ = require('lodash')
const {
  createPromisedApi
} = require('../promised')

const fluid = require('../fluid')
const AbstractApi = require('../abstract_api')

/**
 * API doc: https://developer.atlassian.com/bitbucket/api/2/reference/
 * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/branch-restrictions
 */
module.exports = function BranchRestrictionsApi(api, opts = {}) {
  const result = AbstractApi(api, opts)

  function buildUri(username, repoSlug, action) {
    const baseUri = `repositories/${encodeURI(username)}/${encodeURI(repoSlug)}/commit/{node}`
    return action ? [baseUri, action].join('/') : baseUri
  }

  const localApi = {
    name: 'BranchRestrictions',

    /**
     * Get branch restrictions
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/branch-restrictions#get
     */
    get(username, repoSlug, callback) {
      const uri = buildUri(username, repoSlug, 'branch-restrictions')
      api.post(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Create branch restrictions
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} kind describes what will be restricted.
     *
     *
     * Allowed values for kind are: push, force, delete, and restrict_merges.
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/branch-restrictions#get
     */
    create(username, repoSlug, kind, callback) {
      const uri = buildUri(username, repoSlug, 'branch-restrictions')
      const data = {
        kind
      }
      api.post(
        uri, data, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get branch restriction by id
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} restrictionId (id) of branch restriction
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/branch-restrictions/%7Bid%7D
     */
    getRestriction(username, repoSlug, restrictionId, callback) {
      const uri = buildUri(username, repoSlug, `branch-restrictions/${restrictionId}`)
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Update branch restriction by id
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} restrictionId (id) of branch restriction
     * @param {Object} restrition object
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/branch-restrictions/%7Bid%7D
     */
    updateRestriction(username, repoSlug, restrictionId, restriction, callback) {
      const uri = buildUri(username, repoSlug, `branch-restrictions/${restrictionId}`)
      const data = {
        _body: restriction
      }
      api.put(
        uri,
        data, null,
        result.$createListener(callback)
      )
    },

    /**
     * Remove branch restriction by id
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} restrictionId (id) of branch restriction
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/branch-restrictions/%7Bid%7D
     */
    removeRestriction(username, repoSlug, restrictionId, callback) {
      const uri = buildUri(username, repoSlug, `branch-restrictions/${restrictionId}`)
      api.delete(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },
  }

  localApi.forProject = fluid(localApi, 2)
  localApi.forNode = fluid(localApi, 3)
  localApi.forComment = fluid(localApi, 4)
  localApi.promised = createPromisedApi(localApi, opts)
  return _.assign(result, localApi)
}
