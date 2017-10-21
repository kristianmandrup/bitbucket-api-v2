import {
  repos
} from './_imports'
import {
  test,
  values,
  mock,
  // $api,
  createApi,
  prepareTest,
  prepareForTests
} from '../helpers'

const $api = createApi({
  logging: true
})

// const api = $api.repositories.promised
const api = $api.repositories.promised

prepareForTests(test)

const {
  user,
  repo,
  node
} = values

const singleRepo = require('./mocks/repos/repo-single.json')

test.only('Repositories: get(username, repoSlug, callback)', async t => {
  await mock('get', {
    path: new RegExp(`repositories/${user}/${repo}`),
    body: singleRepo,
    code: 200,
    accessToken
  }) // default get
  let result = await api.get(user, repo)
  t.truthy(result)
})

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

test('Repositories: create(username, repo, callback)', async t => {
  let result = await api.create(user, repo)
  t.truthy(result)
})

test('Repositories: createPullRequest(username, repoSlug, pullRequest, callback)', async t => {
  t.fail('todo')
})

test('Repositories: commit(username, repoSlug, params, options, callback)', async t => {
  t.fail('todo')
})

test('Repositories: getBranches(username, repoSlug, callback)', async t => {
  t.fail('todo')
})

test('Repositories: getCommit(username, repoSlug, revision, callback)', async t => {
  t.fail('todo')
})

test('Repositories: getPullRequests(username, repoSlug, state, callback)', async t => {
  t.fail('todo')
})

test('Repositories: getByUser(username, callback)', async t => {
  t.fail('todo')
})

test('Repositories: getByTeam(teamname, callback)', async t => {
  t.fail('todo')
})

test('Repositories: getForks(username, repoSlug, callback)', async t => {
  t.fail('todo')
})

test('Repositories: getForksFromResponse(response, callback)', async t => {
  t.fail('todo')
})

test('Repositories: getParentFromResponse(response, callback)', async t => {
  t.fail('todo')
})

test('Repositories: hasParent(response)', async t => {
  t.fail('todo')
})

test('Repositories: forProject(username, repoSlug)', async t => {
  t.fail('todo')
})
