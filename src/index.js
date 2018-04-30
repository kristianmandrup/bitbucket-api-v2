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
  createBitbucketAPI,
  createBitBucketAPI: createBitbucketAPI, // alias
  createAuthenticatedAPI,
  createRequest,
  adapters,
  $api,
  utils
}
