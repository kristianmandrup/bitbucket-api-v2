const {
  createBitbucketAPI
} = require('bitbucket-v2')

function createApi(opts = {}) {
  // or: createBitbucketAPI({useXhr: true})
  return createBitbucketAPI()
}

function prepareTest(test, handle, methods) {
  let $stubs
  test.before(t => {
    user = 'kmandrup'
    repo = 'my-repo'
    methods.map(method => {
      $stubs[name] = sinon.stub(handle, method)
    })
  })

  test.after(t => {
    methods.map(method => {
      $stubs[name].restore()
    })
  })
  return {
    $stubs,
    user,
    repo
  }
}

module.exports = {
  $api: createApi(),
  createApi,
  prepareTest
}
