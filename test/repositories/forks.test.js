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
let {
  $stubs,
  user,
  repo
} = prepareTest(test, api, methods)

const expected = require('./mocks/forks.json')
const file = '123'

test('Downloads: getAll(username, repoSlug, callback)', async t => {
  $stubs.getAll.returns(Promise.resolve(expected))

  let result = await api.getAll(user, repo)
  t.truthy(result)
})

test('Downloads: upload(username, repoSlug, file, callback)', async t => {
  $stubs.upload.returns(Promise.resolve(expected))

  let result = await api.upload(user, repo, file)
  t.truthy(result)
})
