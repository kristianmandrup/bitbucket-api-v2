import {
  test,
  Repositories
} from './imports'
import {
  prepareTest
} from './prepare'
import {
  createApi
} from './prepare'

const {
  $get,
  $post,
  user,
  repo
} = prepareTest()

const $api = createApi()
const api = $api.repositories.promised

function isFun(t, x) {
  t.is(typeof x, 'function')
}

test.cb('Repositories: new', t => {
  t.truthy(Repositories)
  let reps = new Repositories(api)
  // check api
  isFun(t, reps.commit)

  // check promised api
  let project = reps.forProject(user, repo)
  isFun(t, project.commit)

  // check callback API
  reps.get(user, repo, result => {
    t.truthy(result)
    t.end()
  })
})

test('Repositories: get', async t => {
  let result = await repositories.get(user, repo)
})

test('Repositories: create', async t => {
  t.truthy(Repositories)

  let result = await $get(user, repo)
    .expect(200)
})
