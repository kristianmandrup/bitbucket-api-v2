import {
  test,
  Components
} from './imports'

import {
  $api,
  prepareTest
} from '../prepare'

const api = $api.components.promised
let methods = ['getAll']
let {
  $stubs,
  user,
  repo
} = prepareTest(test, api, methods)

const expected = require('./mocks/commits.json')
const node = '123'

test('Components: getAll', async t => {
  $stubs.getAll.returns(Promise.resolve(expected))

  let result = await api.getAll(user, repo, node)
  t.truthy(result)
})
