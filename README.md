# Bitbucket API v2

[Node.js](nodejs.org) library to access the Bitbucket API v2

- See [Use the Bitbucket Cloud REST APIs](https://confluence.atlassian.com/bitbucket/use-the-bitbucket-cloud-rest-apis-222724129.html)

## Alternatives

Check out [bitbucket-server-nodejs](https://github.com/sternba/bitbucket-server-nodejs)

## Status

Most of the bitbucket API is covered. The few remaining functions are easy to add if you have the need.

Now has full test coverage of API. All tests pass :)

We use macros to generate tests based on data templates.
The tests use [nock](https://www.npmjs.com/package/nock) to mock each HTTP requests to the server.

Take it for a spin :)

## Usage

Authentication via [Bitbucket OAuth2](https://developer.atlassian.com/bitbucket/api/2/reference/meta/authentication)

Create an OAuth2 token under [Account](https://bitbucket.org/account).

Add the `Secret` and `Key` to environment variables or similar.

Create a Callback URL such as: `http://localhost/bitbucket/authenticated`

You will need to create an endpoint on your server to receive the access token from bitbucket and then proceed.

```js
const { createBitbucketAPI } = require('bitbucket-api-v2')
const bitbucketApi = createBitbucketAPI() //or: createBitbucketAPI({useXhr: true})
bitbucketApi.authenticateOAuth2(someAccessToken)
```

If you are unable to use ES 2015 modules directly, try using the pre-compiled `dist` bundles:

```js
const { createBitbucketAPI } = require('bitbucket-api-v2/dist/bitbucketAPI')
```

Minified:

```js
const { createBitbucketAPI } = require('bitbucket-api-v2/dist/bitbucketAPI.min')
```

Note: You may also use `createBitBucketAPI` (deprecated)

## API usage

Get the user info (of authenticated user)

```js
bitbucketApi.user.get((response) => {
  console.log(response.username);
});
```

## Architecture

The library by default uses [xhr](https://www.npmjs.com/package/xhr) to submit Ajax requests to the server.

Would be nice to switch to [xhr2](https://www.npmjs.com/package/xhr2) or a higher level, more feature rich API such as [request](https://www.npmjs.com/package/request)

Please see [Request customization](https://github.com/kristianmandrup/bitbucket-api-v2/blob/master/docs/Request-customization.md) for details on how to customize how requests to the server are being made

### Authentication

Please see [Authentication](https://github.com/kristianmandrup/bitbucket-api-v2/blob/master/docs/Authentication.md) for how to authenticate and get an access token.

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

Please see the [API overview](https://github.com/kristianmandrup/bitbucket-api-v2/blob/master/docs/Api.md) for a full list of available API methods.

See [API usage](https://github.com/kristianmandrup/bitbucket-api-v2/blob/master/docs/Api-usage.md) for details on usage.

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
const commit = api.commit.promised
let result = await commit.approve(username, repoSlug, commitId)
```

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

## Debugging

To enable logging on requests sent to the server, try adding `logging: true` to the options argument when creating the API.

```js
createBitbucketAPI({
  logging: true
})
```

## Tests

Tests will be written and run using [ava](https://github.com/avajs/ava) the "Futuristic JavaScript test runner"

Intial skeleton tests have been started. Please contribute!

Please see [Testing](https://github.com/kristianmandrup/bitbucket-api-v2/blob/master/docs/Testing.md) for best practices when writing tests for the API.

In short: use *test generators* via mocks made with `nock`!

To run test suite:

```js
$ npm install
// install all dependencies ...
$ npm test
// test output
```

## Client bundling

To use this library in the browser, see the `/dist` folder for `dev` and `prod` (ie. minified) pre-bundled versions.

To create your own bundles, see [Testing](https://github.com/kristianmandrup/bitbucket-api-v2/blob/master/docs/Client-bundling.md)

## Docs

See more documentation in `/docs`

## License

MIT 2017

(see LICENSE.txt)
