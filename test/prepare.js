const {
  createBitbucketAPI
} = require('bitbucket-v2')

function createApi(opts = {}) {
  // or: createBitbucketAPI({useXhr: true})
  return createBitbucketAPI()
}

// FIX: use request or xhr2
const xhr = require('xhr')

const verbs = [
  'get',
  'post',
  'delete',
  'update'
]

function prepareTest(test) {
  let $get, $post, user, repo
  test.before(t => {
    user = 'kmandrup'
    repo = 'my-repo'
    verbs.map(verb => {
      $stubs[name] = sinon.stub(xhr, verb)
    })
  })

  test.after(t => {
    $get.restore()
    $post.restore()
  })
  return {
    $get,
    $post,
    user,
    repo
  }
}

module.exports = {
  createApi,
  prepareTest
}
