# Bitbucket v2

[Node.js](nodejs.org) library to access the Bitbucket API v2

- See [Use the Bitbucket Cloud REST APIs](https://confluence.atlassian.com/bitbucket/use-the-bitbucket-cloud-rest-apis-222724129.html)

## Alternatives

Check out [bitbucket-server-nodejs](https://github.com/sternba/bitbucket-server-nodejs)

## Status

WIP: Loads of API additions. Almost complete!

Still untested. Please take it for a spin or help add tests for the test suite

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

### Main api objects

- `repositories`
- `teams`
- `user`
- `users`
- `addon`
- `hookEvents`

APIs acting on a user repository

- `commit`
- `commits`
- `components`
- `issues`
- `milestones`
- `pipelines`
- `pullRequests`
- `refs`
- `versions`
- `hooks`
- `pipelinesConfig`
- `forks`
- `downloads`
- `branchRestrictions`

## Full API list

Please see the [API document](https://github.com/kristianmandrup/node-bitbucket-v2/blob/master/Api.md) for a full list of implemented and available API methods

### API usage

Callback API:

```js
api.commit.approve(username, repoSlug, commitId, (result) => {
  // ...
  console.log(result)
})
```

Promise API

```js
let result = await api.commit.promised.approve(username, repoSlug, commitId)
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
