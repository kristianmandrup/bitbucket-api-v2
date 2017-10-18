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

Would be nice with a more "fluent" api so we can avoid having to use the form: `username, repoSlug` for each request

Would like to see:

```js
let project = repositories.forProject(username, repo)
await project.create()
await project.commit(files)
```

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

### Commits

To post a new commit:

API is now available [as noted here](https://community.atlassian.com/t5/Bitbucket-questions/Do-you-having-an-API-to-push-the-content-to-BitBucket-Repo/qaq-p/15318#M17395
)

See [repo slug POST](https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/src#post) for details

#### multipart/form-data

Use `multipart/form-data` when we need to upload a file:

```html
<form action="/update" method="post" encrypt="multipart/form-data>
  <input type="text" name="username" />
  <input type="file" name="avatar" />
  <button type="submit" />
</form>
```

Current implementation in repositories:

```js
commit(username, repoSlug, files, callback) {
  const uri = buildUri(username, repoSlug);
  api.post(
    uri,
    files, {
      contentType: 'multipart/form-data'
    },
    result.$createListener(callback)
  );
},
```

Note that we are sending the files as the data argument and passing `contentType: 'multipart/form-data'` in options to force override of default `content-type` set to `'application/json'` for `send`.

#### application/x-www-form-urlencoded

It is also possible to upload new files using a simple `application/x-www-form-urlencoded` POST. This can be convenient when uploading pure text files:

```txt
$ curl https://api.bitbucket.org/2.0/repositories/atlassian/bbql/src/ \
  --data-urlencode "/path/to/me.txt=Lorem ipsum." \
  --data-urlencode "message=Initial commit" \
  --data-urlencode "author=Erik van Zijst <erik.van.zijst@gmail.com>"
```

There could be a field name clash if a client were to upload a file named "message", as this filename clashes with the meta data property for the commit message. To avoid this and to upload files whose names clash with the meta data properties, use a leading slash for the files, e.g. `curl --data-urlencode "/message=file contents"`.

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

## License

MIT 2017

(see LICENSE.txt)
