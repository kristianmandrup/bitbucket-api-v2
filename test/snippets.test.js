import test from 'ava'
import request from 'supertest'
import Snippets from '../src/hook-events'

test('Snippets: create', async t => {
  t.truthy(Snippets)
})

test('Teams: get(callback)', async t => {
  t.fail('todo')
})

test('Teams: create(files, callback)', async t => {
  t.fail('todo')
})

test('Teams: createWithMeta(data, callback)', async t => {
  t.fail('todo')
})

test('Teams: getFor(username, callback)', async t => {
  t.fail('todo')
})

test('Teams: createSnippetFor(username, snippet, callback)', async t => {
  t.fail('todo')
})

test('Teams: getSnippetFor(username, snippetId, callback)', async t => {
  t.fail('todo')
})

test('Teams: updateSnippetFor(username, snippetId, snippet, callback)', async t => {
  t.fail('todo')
})

test('Teams: removeSnippetFor(username, snippetId, snippet, callback)', async t => {
  t.fail('todo')
})

test('Teams: getSnippetCommentsFor(username, snippetId, callback)', async t => {
  t.fail('todo')
})

test('Teams: addSnippetCommentFor(username, snippetId, comment, callback)', async t => {
  t.fail('todo')
})

test('Teams: getSnippetCommitsFor(username, snippetId, callback)', async t => {
  t.fail('todo')
})

test('Teams: isSnippetWatchedFor(username, snippetId, callback)', async t => {
  t.fail('todo')
})

test('Teams: watchSnippetFor(username, snippetId, callback)', async t => {
  t.fail('todo')
})

test('Teams: stopWatchingSnippetFor(username, snippetId, callback)', async t => {
  t.fail('todo')
})

test('Teams: getSnippetWatchersFor(username, snippetId, callback)', async t => {
  t.fail('todo')
})
