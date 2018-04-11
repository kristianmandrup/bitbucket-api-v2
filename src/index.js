const {
  Bitbucket,
  createBitbucketAPI,
  createAuthenticatedAPI
} = require('./bitbucket')
const {
  createRequest,
  adapters
} = require('./request')
const $api = require('./api')

const utils = require('./util')

module.exports = {
  Bitbucket,
  createBitBucketAPI,
  createBitBucketAPI: createBitbucketAPI, // alias
  createAuthenticatedAPI,
  createRequest,
  adapters,
  $api,
  utils
}
