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
let $stubs = prepareTest(test, api, methods)

test('Issues: getAll', async t => {
  const expected = require('./mocks/hooks.json')
  const node = '123'
  $stubs.getAll.returns(Promise.resolve(expected))

  let result = await api.getAll(user, repo, node)
  t.truthy(result)
})

test('Issues: get', async t => {
  const expected = require('./mocks/hooks.json')
  const node = '123'
  $stubs.get.returns(Promise.resolve(expected))

  let result = await api.get(user, repo, node)
  t.truthy(result)
})

test('Issues: remove', async t => {
  const expected = require('./mocks/hooks.json')
  const node = '123'
  $stubs.remove.returns(Promise.resolve(expected))

  let result = await api.remove(user, repo, node)
  t.truthy(result)
})
