import {
  test,
  Commit
} from './imports'

import {
  $api,
  prepareTest
} from '../prepare'

const api = $api.commit.promised
let methods = ['approve', 'disApprove']
let $stubs = prepareTest(test, api, methods)

test('Commit: approve', async t => {
  const expected = require('./mocks/commit.json')
  const node = '123'
  $stubs.approve.returns(Promise.resolve(expected))

  let result = await api.approve(user, repo, node)
  t.truthy(result)
})

test('Commit: disApprove', async t => {
  const expected = require('./mocks/commit.json')
  const node = '123'
  $stubs.disApprove.returns(Promise.resolve(expected))

  let result = await api.commit.disApprove(user, repo, node)
  t.truthy(result)
})
