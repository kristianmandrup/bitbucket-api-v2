const {
  createBitBucketAPI,
  createAuthenticatedAPI,
  getAccessToken
} = require('../../src/bitbucket')

function createApi(opts = {}) {
  return createBitBucketAPI(opts)
}

module.exports = {
  $api: createApi(),
  createApi,
  createAuthenticatedAPI,
  getAccessToken
}
