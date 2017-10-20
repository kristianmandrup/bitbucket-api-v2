const {
  createBitBucketAPI
} = require('../../src/bitbucket')

console.log({
  createBitBucketAPI
})

function createApi(opts = {}) {
  // or: createBitBucketAPI({useXhr: true})
  return createBitBucketAPI()
}

module.exports = {
  $api: createApi(),
  createApi
}
