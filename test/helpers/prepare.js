const nock = require('nock')

const {
  createBitbucketAPI
} = require('bitbucket-v2')

function createApi(opts = {}) {
  // or: createBitbucketAPI({useXhr: true})
  return createBitbucketAPI()
}

module.exports = {
  $api: createApi(),
  createApi,
  prepareTest
}
