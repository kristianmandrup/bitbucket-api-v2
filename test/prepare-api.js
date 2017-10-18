const {
  createBitbucketAPI
} = require('bitbucket-v2')

const defaults = {
  token: 'xxx'
}

module.exports = function prepareApi(opts = {}) {
  let token = opts.token || defaults.token
  // or: createBitbucketAPI({useXhr: true})
  const api = createBitbucketAPI()
  api.authenticateOAuth2(token)
  return api
}
