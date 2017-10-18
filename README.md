# Bitbucket v2

[Node.js](nodejs.org) library to access the Bitbucket API v2

- See [Use the Bitbucket Cloud REST APIs](https://confluence.atlassian.com/bitbucket/use-the-bitbucket-cloud-rest-apis-222724129.html)

## Alternatives

Check out [bitbucket-server-nodejs](https://github.com/sternba/bitbucket-server-nodejs)

## Usage

Authentication via [Bitbucket OAuth2](https://developer.atlassian.com/bitbucket/api/2/reference/meta/authentication)

```js
const { createBitbucketAPI } = require('node-bitbucket-v2')
const bitbucketApi = createBitbucketAPI(); //or: createBitbucketAPI({useXhr: true})
bitbucketApi.authenticateOAuth2(someAccessToken);
```

Get the user info (of authenticated user)

```js
bitbucketApi.user.get((response) => {
  console.log(response.username);
});
```

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

- `get(callback)`

## Repositories

- `create(username, repo, callback)`
- `createPullRequest(username, repoSlug, pullRequest, callback)`
- `get(username, repoSlug, callback)`
- `getBranches(username, repoSlug, callback)`
- `getCommit(username, repoSlug, sha, callback)`
- `getPullRequests(username, repoSlug, state, callback)`
- `getByUser(username, callback)`
- `getByTeam(teamname, callback)`
- `getForks(username, repoSlug, callback)`
- `getForksFromResponse(response, callback)`
- `getParentFromResponse(response, callback)`

## Teams

- `get(role = 'member', callback)`

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

## License

MIT 2017

(see LICENSE.txt)
