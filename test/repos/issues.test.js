import {
  test,
  Issues
} from './imports'

import {
  $api,
  prepareTest
} from '../prepare'

const api = $api.issues.promised
let methods = ['getAll', 'get', 'remove']
let {
  $stubs,
  user,
  repo
} = prepareTest(test, api, methods)

const expected = require('./mocks/hooks.json')
const node = '123'

test('Issues: create(username, repoSlug, callback)', async t => {
  prepareStub($stubs, expected)
  let result = await api.create(user, repo)
  t.truthy(result)
})

test('Issues: getAll(username, repoSlug, callback)', async t => {
  prepareStub($stubs, expected)
  let result = await api.getAll(user, repo)
  t.truthy(result)
})

test('Issues: get(username, repoSlug, issue_id, callback)', async t => {
  prepareStub($stubs, expected)
  let result = await api.get(user, repo, node)
  t.truthy(result)
})

test('Issues: remove(username, repoSlug, issue_id, callback)', async t => {
  prepareStub($stubs, expected)
  let result = await api.remove(user, repo, node)
  t.truthy(result)
})

test('Issues: getAttachments(username, repoSlug, issue_id, callback)', async t => {
  prepareStub($stubs, expected)
  let result = await api.remove(user, repo, node)
  t.truthy(result)
})

test('Issues: getAttachment(username, repoSlug, issue_id, path, callback)', async t => {
  prepareStub($stubs, expected)
  let result = await api.remove(user, repo, node)
  t.truthy(result)
})

test('Issues: uploadAttachments(username, repoSlug, issue_id, attachments, options, callback)', async t => {
  prepareStub($stubs, expected)
  let result = await api.remove(user, repo, node)
  t.truthy(result)
})

test('Issues: getComments(username, repoSlug, issue_id, callback)', async t => {
  prepareStub($stubs, expected)
  let result = await api.remove(user, repo, node)
  t.truthy(result)
})

test('Issues: getComment(username, repoSlug, issue_id, commentId, callback)', async t => {
  prepareStub($stubs, expected)
  let result = await api.remove(user, repo, node)
  t.truthy(result)
})

test('Issues: hasVoted(username, repoSlug, issue_id, callback)', async t => {
  prepareStub($stubs, expected)
  let result = await api.remove(user, repo, node)
  t.truthy(result)
})

test('Issues: vote(username, repoSlug, issue_id, callback)', async t => {
  prepareStub($stubs, expected)
  let result = await api.remove(user, repo, node)
  t.truthy(result)
})

test('Issues: retractVote(username, repoSlug, issue_id, callback)', async t => {
  prepareStub($stubs, expected)
  let result = await api.remove(user, repo, node)
  t.truthy(result)
})

test('Issues: isWatched(username, repoSlug, issue_id, callback)', async t => {
  prepareStub($stubs, expected)
  let result = await api.isWatched(user, repo, node)
  t.truthy(result)
})

test('Issues: watch(username, repoSlug, issue_id, callback)', async t => {
  prepareStub($stubs, expected)
  let result = await api.watch(user, repo, node)
  t.truthy(result)
})

test('Issues: stopWatch(username, repoSlug, issue_id, callback)', async t => {
  prepareStub($stubs, expected)
  let result = await api.stopWatch(user, repo, node)
  t.truthy(result)
})

test('Issues: forProject(username, repoSlug)', async t => {
  prepareStub($stubs, expected)
  let result = await api.forProject(user, repo, node)
  t.truthy(result)
})

test('Issues: forIssue(username, repoSlug, issue_id)', async t => {
  prepareStub($stubs, expected)
  let result = await api.forIssue(user, repo, node)
  t.truthy(result)
})
