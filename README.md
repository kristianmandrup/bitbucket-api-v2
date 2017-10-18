# Bitbucket v2

[Node.js](nodejs.org) library to access the Bitbucket API v2

- See [Use the Bitbucket Cloud REST APIs](https://confluence.atlassian.com/bitbucket/use-the-bitbucket-cloud-rest-apis-222724129.html)

## Alternatives

Check out [bitbucket-server-nodejs](https://github.com/sternba/bitbucket-server-nodejs)

## Usage

Authentication via [Bitbucket OAuth2](https://developer.atlassian.com/bitbucket/api/2/reference/meta/authentication)

```js
const { createBitbucketAPI } = require('bitbucket-v2')
const bitbucketApi = createBitbucketAPI(); //or: createBitbucketAPI({useXhr: true})
bitbucketApi.authenticateOAuth2(someAccessToken);
```

Get the user info (of authenticated user)

```js
bitbucketApi.user.get((response) => {
  console.log(response.username);
});
```

## Architecture

Uses [xhr](https://www.npmjs.com/package/xhr) to submit Ajax requests to the server.
Could be nice to switch to [xhr2](https://www.npmjs.com/package/xhr2) or a higher level, more feature rich API!

Each resource uses `Request` to perform the actual server requests.

## Request

- `setOption(name, value)`
- `getOption(name, _defaultValue)`
- `get(apiPath, parameters, options, callback)`
- `post(apiPath, parameters, options, callback)`
- `send(apiPath, parameters, httpMethod = 'GET', __options, callback)`
- `doPrebuiltSend(prebuiltURL, callback)`
- `doSend(apiPath, parameters, _httpMethod, options, callback)`
- `decodeResponse(response)`
- `prepRequest(options)`
- `sendHttpsRequest(httpsOptions, query, done)`
- `sendXhrRequest(xhrOptions, done)`

## User

See [user API](https://developer.atlassian.com/bitbucket/api/2/reference/resource/user)

- `get(callback)`

## Users

See [users API](https://developer.atlassian.com/bitbucket/api/2/reference/resource/users)

TODO

## Repositories

Would be nice with a more "fluent" api so we can avoid having to use the form: `username, repoSlug` for each repository request

Would like to see:

```js
let project = repositories.forProject(username, repo)
await project.create()
await project.commit(commit)
```

`forProject` now has experimental support ;)

See [repositories API](https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories)

POST (create)

- `create(username, repo, callback)`

### On existing repositiory

See [repo (slug) API](https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D)

- `createPullRequest(username, repoSlug, pullRequest, callback)`

GET (get)

- `get(username, repoSlug, callback)`
- `getBranches(username, repoSlug, callback)`
- `getCommit(username, repoSlug, sha, callback)`
- `getPullRequests(username, repoSlug, state, callback)`
- `getByUser(username, callback)`
- `getByTeam(teamname, callback)`
- `getForks(username, repoSlug, callback)`
- `getForksFromResponse(response, callback)`
- `getParentFromResponse(response, callback)`

POST

- `commit(username, repoSlug, files, callback)`
- `commit(username, repoSlug, files, options, callback)`

### Commit

Repository commit:

- `approve(username, repoSlug, node, callback)`
- `disApprove(username, repoSlug, node, callback)`
- `getBuildStatuses(username, repoSlug, node, callback)`
- `createNewBuild(username, repoSlug, node, callback)`
- `getBuildStatus(username, repoSlug, node, key, callback)`
- `getComments(username, repoSlug, sha, callback)`
- `getComment(username, repoSlug, sha, commentId, callback)`

### Commits

- `getAll(username, repoSlug, callback)`

### Components

- `getAll(username, repoSlug, callback)`

### Issues

- `create(username, repoSlug, callback)`
- `getAll(username, repoSlug, callback)`
- `get(username, repoSlug, issue_id, callback)`
- `remove(username, repoSlug, issue_id, callback)`
- `getAttachments(username, repoSlug, issue_id, callback)`
- `getAttachment(username, repoSlug, issue_id, path, callback)`
- `uploadAttachments(username, repoSlug, issue_id, attachments, options, callback)`
- `getComments(username, repoSlug, issue_id, callback)`
- `getComment(username, repoSlug, issue_id, commentId, callback)`
- `hasVoted(username, repoSlug, issue_id, callback)`
- `vote(username, repoSlug, issue_id, callback)`
- `retractVote(username, repoSlug, issue_id, callback)`
- `isWatched(username, repoSlug, issue_id, callback)`
- `watch(username, repoSlug, issue_id, callback)`
- `stopWatch(username, repoSlug, issue_id, callback)`

### Milestones

- `getAll(username, repoSlug, callback)`
- `get(username, repoSlug, milestoneId, callback)`

### Pipelines

- `create(username, repoSlug, callback)`
- `getAll(username, repoSlug, callback)`
- `get(username, repoSlug, pipeline, callback)`
- `stop(username, repoSlug, pipeline, callback)`
- `getSteps(username, repoSlug, pipeline, callback)`
- `getStep(username, repoSlug, pipeline, step, stepUuid, callback)`

### Pull requests

TODO

### Refs

TODO

## Teams

See [teams API](https://developer.atlassian.com/bitbucket/api/2/reference/resource/teams)

- `get(role = 'member', callback)`

## Hook events

See [hook events API](https://developer.atlassian.com/bitbucket/api/2/reference/resource/hook_events)

## Snippets

See [snippets API](https://developer.atlassian.com/bitbucket/api/2/reference/resource/snippets)

## Addon

See [addon API](https://developer.atlassian.com/bitbucket/api/2/reference/resource/addon)

## Promise support async/await

A promise based API has been using the [promisify utility function available in Node 8+](http://2ality.com/2017/05/util-promisify.html).

### Promised API usage

Generate default `promised` API

```js
async function user() {
  const bitbucketApi = createBitbucketAPI().promised
  let response = await bitbucketApi.user.get();
  console.log(response.username);
}
```

To generate customized `promised` API, create a function with the signature `createPromisedApi(api = {}, opts = {})`, which returns a promisified `api` object the way you like it. See `bitbucket/promised.js` for reference.

You can also pass you own `promisify` function to be used in the default or custom factory function.

```js
const createPromisedAPI = require('./my-own-create-promised')
const promisify = require('./my-promisify')

const bitbucketApi = createBitbucketAPI({
  createPromisedAPI,
  promisify
})

async function user() {
  let response = await bitbucketApi.user.get();
  console.log(response.username);
}
```

### Disable promised API

To disable generation of promised based API pass `promised: false` option

```js
const bitbucketApi = createBitbucketAPI({
  promised: false
})
```

## Tests

Tests will be written and run using [ava](https://github.com/avajs/ava) the "Futuristic JavaScript test runner"

Intial skeleton tests have been started. Please contribute!

To run test suite:

```js
$ npm install
// install all dependencies ...
$ npm test
// test output
```

## Docs

See more documentation in `/docs`

## License

MIT 2017

(see LICENSE.txt)
