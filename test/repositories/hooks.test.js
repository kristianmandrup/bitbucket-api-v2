import {
  test,
  Hooks
} from './imports'

import {
  $api,
  prepareTest
} from '../prepare'

const api = $api.hooks.promised
let methods = ['getAll', 'create']
let $stubs = prepareTest(test, api, methods)

test('Hooks: getAll', async t => {
  const expected = require('./mocks/hooks.json')
  const node = '123'
  $stubs.getAll.returns(Promise.resolve(expected))

  let result = await api.getAll(user, repo, node)
  t.truthy(result)
})

test('Hooks: create', async t => {
  const expected = require('./mocks/hooks.json')
  const node = '123'
  $stubs.create.returns(Promise.resolve(expected))

  let result = await api.create(user, repo, node)
  t.truthy(result)
})
