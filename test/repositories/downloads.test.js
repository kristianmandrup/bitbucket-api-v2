import {
  test,
  Downloads
} from './imports'

import {
  $api,
  prepareTest
} from '../prepare'

const api = $api.components.promised
let methods = ['getAll', 'upload']
let $stubs = prepareTest(test, api, methods)

test('Downloads: getAll', async t => {
  const expected = require('./mocks/downloads.json')
  const node = '123'
  $stubs.getAll.returns(Promise.resolve(expected))

  let result = await api.getAll(user, repo, node)
  t.truthy(result)
})

test('Downloads: upload', async t => {
  const expected = require('./mocks/downloads.json')
  const node = '123'
  $stubs.upload.returns(Promise.resolve(expected))

  let result = await api.upload(user, repo, node)
  t.truthy(result)
})
