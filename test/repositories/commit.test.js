import {
  test,
  Commit
} from './imports'

import {
  prepareTest
} from '../prepare'

const {
  $get,
  $post,
  user,
  repo
} = prepareTest()

test('Commit: approve', async t => {
  const expected = require('./mocks/commit.json')
  const node = '123'
  $stubs.post.returns(Promise.resolve(expected))

  let result = await api.commit.approve(user, repo, node)
  t.truthy(result)
})

test('Commit: disApprove', async t => {
  const expected = require('./mocks/commit.json')
  const node = '123'
  $stubs.delete.returns(Promise.resolve(expected))

  let result = await api.commit.disApprove(user, repo, node)
  t.truthy(result)
})
