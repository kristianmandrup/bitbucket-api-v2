import {
  test,
  Forks
} from './imports'

import {
  $api,
  prepareTest
} from '../prepare'

const api = $api.forks.promised
let methods = ['getAll']
let $stubs = prepareTest(test, api, methods)

test('Downloads: getAll', async t => {
  const expected = require('./mocks/forks.json')
  const node = '123'
  $stubs.getAll.returns(Promise.resolve(expected))

  let result = await api.getAll(user, repo, node)
  t.truthy(result)
})
