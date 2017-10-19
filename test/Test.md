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
