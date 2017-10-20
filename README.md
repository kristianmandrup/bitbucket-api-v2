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

Create an OAuth2 token under [Account](https://bitbucket.org/account).

Add the `Secret` and `Key` to environment variables or similar.

Create a Callback URL such as: `http://localhost/bitbucket/authenticated`

You will need to create an endpoint on your server to receive the access token from bitbucket and then proceed.

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

### JWT

Is there possibly support for [JWT auth?](https://community.atlassian.com/t5/Answers-Developer-Questions/Can-t-get-access-token-with-JWT-from-Bitbucket-API/qaq-p/533548)

```bash
curl -X POST -H "Authorization: JWT {jwt_token}"
  https://bitbucket.org/site/oauth2/access_token \
  -d grant_type=urn:bitbucket:oauth2:jwt
```

### OAuth2

[Bitbucket OAuth guide](https://confluence.atlassian.com/bitbucket/oauth-on-bitbucket-cloud-238027431.html)

[More on Oauth2](https://developer.atlassian.com/cloud/bitbucket/oauth-2/)

We support all 4 of [RFC-6750](https://tools.ietf.org/html/rfc6749)'s grant flows to obtain access tokens through the following URL's:

`https://bitbucket.org/site/oauth2/authorize`

`https://bitbucket.org/site/oauth2/access_token`

### Authorization code grant

The three-legged OAuth flow involves the following sets of tokens and secrets that the server issues:

#### Client ID, client secret, and client certificate

The client ID is a unique identifier for an OAuth client. The OAuth client uses its client ID and client secret or its client ID and client certificate to provide identity. In the specification, the client ID is client_id and client secret is client_secret. When you define an OAuth client profile for DataPower integration, the configured name is the client ID.

#### Access token

The access token is an identifier to access the protected resources of the resource owner. The OAuth client can use the access token before it expires. The resource server honors the access token until expiry.

#### Refresh token

The refresh token is an identifier to obtain access tokens. The authorization server generates the refresh token together with the access token as configured. The OAuth client can use the refresh token to request a new access token from the authorization server when the current access token expires or to request an access token with identical or narrower scope. Unlike access tokens, refresh tokens are not sent to the resource server.

### The bitbucket 3-LO flow

Request authorization from the end user by sending their browser to:

`https://bitbucket.org/site/oauth2/authorize?client_id={client_id}&response_type=code`

The callback includes the `?code={}` query parameter that you can swap for an access token:

```bash
$ curl -X POST -u "client_id:secret" \
  https://bitbucket.org/site/oauth2/access_token \
  -d grant_type=authorization_code -d code={code}
```

`-u "client_id:secret"` is the username

Note: See the `test/server` folder for a sample Express server setup with an authentication callback handler!

Once you have an access token, as per [RFC-6750](https://tools.ietf.org/html/rfc6749), you can use it in a request in any of the following ways (in decreasing order of desirability):

- Send it in a request header: `Authorization: Bearer {access_token}`
- Include it in a (`application/x-www-form-urlencoded`) `POST` body as `access_token={access_token}`
- Put it in the query string of a non-POST: `?access_token={access_token}`

### Refresh Tokens

Bitbucket access tokens expire in one hour. When this happens you’ll get `401` responses.

Most access token grant responses (Implicit and JWT excluded) therefore include a refresh token that can then be used to generate a new access token, without the need for end user participation:

```js
$ curl -X POST -u "client_id:secret" \
  https://bitbucket.org/site/oauth2/access_token \
  -d grant_type=refresh_token -d refresh_token={refresh_token}
```

### Managing (token) secrets

During development/testing, you can place your own tokens in `test/secret/access-tokens.json`, something like this (not real keys here!):

```json
{
  "key": "a9d9fg2A3XrNFPjPwh9zx",
  "secret": "1djJwEd3fU4ptVut9QRPz6zjAxfUNqLA"
}
```


## Architecture

The library by default uses [xhr](https://www.npmjs.com/package/xhr) to submit Ajax requests to the server.

Would be nice to switch to [xhr2](https://www.npmjs.com/package/xhr2) or a higher level, more feature rich API such as [request](https://www.npmjs.com/package/request)

Please see [Request customization](https://github.com/kristianmandrup/node-bitbucket-v2/blob/master/Request-customization.md) for details on how to customize how requests to the server are being made

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

Please see the [Test](https://github.com/kristianmandrup/node-bitbucket-v2/blob/master/Api.md) document for best practices when writing tests.

In short: use *test generators* via mocks made with `nock`!

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
