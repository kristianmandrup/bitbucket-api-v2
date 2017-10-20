import {
  test,
  Commit
} from './imports'

import {
  $api,
  prepareTest
} from '../prepare'

const api = $api.commit.promised
let actions = [
  'approve',
  'disApprove',
  'getBuildStatuses',
  'createBuild',
  'getBuildStatus',
  'createBuild',
  'getComments',
  'getComment',
]

let fluids = [
  'forProject',
  'forProjectNode',
  'forComment'
]

let methods = {
  actions,
  fluids
}

let {
  $stubs,
  user,
  repo
} = prepareTest(test, api, methods)

const expected = require('./mocks/commit.json')
const node = '123'

// TODO: generate all tests using data instead!!!

test('Commit: approve', async t => {
  prepareStub($stubs, expected)
  let result = await api.approve(user, repo, node)
  t.truthy(result)
})

test('Commit: disApprove', async t => {
  prepareStub($stubs, expected)
  let result = await api.commit.disApprove(user, repo, node)
  t.truthy(result)
})

test('Commit: getBuildStatuses(username, repoSlug, node, callback)', async t => {
  prepareStub($stubs, expected)
  let result = await api.commit.getBuildStatuses(user, repo, node)
  t.truthy(result)
})

test('Commit: createBuild(username, repoSlug, node, callback)', async t => {
  $stubs.disApprove.returns(Promise.resolve(expected))
  let result = await api.commit.getBuildStatuses(user, repo, node)
  t.truthy(result)
})

test('Commit: getBuildStatus(username, repoSlug, node, key, callback)', async t => {
  prepareStub($stubs, expected)
  let result = await api.commit.getBuildStatuses(user, repo, node)
  t.truthy(result)
})

test('Commit: getComments(username, repoSlug, sha, callback)', async t => {
  prepareStub($stubs, expected)
  let result = await api.commit.getBuildStatuses(user, repo, node)
  t.truthy(result)
})

test('Commit: getComment(username, repoSlug, sha, commentId, callback)', async t => {
  prepareStub($stubs, expected)
  let result = await api.commit.getBuildStatuses(user, repo, node)
  t.truthy(result)
})

test('Commit: forProject(username, repoSlug)', async t => {
  t.fail('todo')
})

test('Commit: forProjectNode(username, repoSlug, node)', async t => {
  t.fail('todo')
})

test('Commit: forComment(username, repoSlug, node, commentId)', async t => {
  t.fail('todo')
})
