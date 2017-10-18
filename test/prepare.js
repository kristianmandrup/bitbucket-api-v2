const {
  createBitbucketAPI
} = require('bitbucket-v2')

const defaults = {
  token: 'xxx'
}

function prepareApi(opts = {}) {
  let token = opts.token || defaults.token
  // or: createBitbucketAPI({useXhr: true})
  const api = createBitbucketAPI()
  api.authenticateOAuth2(token)
  return api
}

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
      $stubs[name] = sinon.stub(request, verb)
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
  prepareApi,
  prepareTest
}
