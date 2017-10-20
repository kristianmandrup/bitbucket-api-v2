# Test

The test are written using [ava]() and [supertest]()

## Samples

Sample tests from [bitbucket-server-nodejs](https://github.com/sternba/bitbucket-server-nodejs) can be found in `test/sample` and used for refeence and inspiration to set up the basic test infrastructure, for mocks etc.

We will use [nock](https://semaphoreci.com/community/tutorials/mocking-external-http-requests-in-node-tests-with-nock) to mock external http requests.

## Generating tests

To reduce maintenance and human error and reduce size of test files etc. we will instead generate tests baed on data:

Please see `test/helpers` folder for some initial Test gernerator infrastructure:

- `mock.js` - perform nock configuration via config object
- `/generators` - generate the ava test
- `guess.js` - to guess http verb from method name

```js
async function execute(config = {}) {
  let {
    methodName,
    api,
    args
  } = config
  return await api[methodName](...args)
}

function createComparer(t, config) {
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

Start with `test/testing.test.js` and go from there ;)

## Mocking

We are using [nock](https://www.npmjs.com/package/nock):

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
