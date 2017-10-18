import {
  test,
  Commits
} from './imports'

import {
  $api,
  prepareTest
} from '../prepare'

const api = $api.commits.promised
let methods = ['getAll']
let $stubs = prepareTest(test, api, methods)

test('Commits: getAll', async t => {
  const expected = require('./mocks/commits.json')
  const node = '123'
  $stubs.getAll.returns(Promise.resolve(expected))

  let result = await api.getAll(user, repo, node)
  t.truthy(result)
})
