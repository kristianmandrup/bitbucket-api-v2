const nock = require('nock')

const {
  createBitbucketAPI
} = require('../..')

function createApi(opts = {}) {
  // or: createBitbucketAPI({useXhr: true})
  return createBitbucketAPI()
}

module.exports = {
  $api: createApi(),
  createApi,
  prepareTest
}
