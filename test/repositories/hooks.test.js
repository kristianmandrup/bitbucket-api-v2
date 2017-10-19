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
let {
  $stubs,
  user,
  repo
} = prepareTest(test, api, methods)

const expected = require('./mocks/hooks.json')
const node = '123'

test('Hooks: getAll', async t => {
  prepareStub($stubs, expected)
  let result = await api.getAll(user, repo, node)
  t.truthy(result)
})

test('Hooks: create', async t => {
  prepareStub($stubs, expected)
  let result = await api.create(user, repo, node)
  t.truthy(result)
})
