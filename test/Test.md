# Test

The test are written using [ava]() and [supertest]()

## Samples

Sample tests from [bitbucket-server-nodejs](https://github.com/sternba/bitbucket-server-nodejs) can be found in `test/sample` and used for refeence and inspiration to set up the basic test infrastructure, for mocks etc.

Also, perhaps use [sinon](http://sinonjs.org/) to simulate successful authentication, responses etc.

See [Sinon Getting Started](http://sinonjs.org/#get-started) for a usage guide.

## Writing tests

Test should be written in the following fashion, using Sinon to stub the responses made by supertest `get`, `post` and other core methods, by using mock responses to simulate the server.

```js
import {
  test,
  sinon,
  request,
  Commit
} from './imports'

import {
  $api,
  // createApi,
  prepareTest
} from './prepare'

const api = $api.commit.promised
let methods = ['approve']

// should stub the underlying mechanism that makes the http requests, such as Xhr or whatever
let $stubs = prepareTest(test, api, methods)

test('Commit: approve', async t => {
  const expected = require('./mocks/commit.json')
  const node = '123'
  $stubs.approve.returns(Promise.resolve(expected))

  let result = await api.approve(user, repo, node)
  t.truthy(result)
})
```

## Generating tests

To reduce maintenance and human error and reduce size of test files etc. we will instead generate tests baed on data:

Please see `test/helpers` folder for some initial infra:

```js
generateTest(test, config = {})

async function execute(config = {}) {
  let {
    methodName,
    api,
    args
  } = config
  return await api[methodName](...args)
}

function createComparer(t, config) => {
  let { expect } = config
  return result => {
    t.is(result.x, expect.x)
  }
}

const expected = {
  create: {
    // expected http response body (json) from create call
  },
  remove: {
    // ...
  }
}

generateTest(test, {
  methodName: 'getAll',
  requestType: 'get', // usually all that is needed
  request: {
    // more request details if needed
  },
  expected,
  createComparer,
  args: []
})
```

## Mocking

We thought about using Sinon but will likely use [nock](https://www.npmjs.com/package/nock) instead:

```js
nock('http://myapp.iriscouch.com')
  .get('/users/1')
  .reply(200, {
    _id: '123ABC',
    _rev: '946B7D1C',
    username: 'pgte',
    email: 'pedro.teixeira@gmail.com'
    });
```
