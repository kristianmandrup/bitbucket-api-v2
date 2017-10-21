# Test

The test are written using `async`/`await` and:

- [ava](https://github.com/avajs/ava)
- [supertest](https://github.com/visionmedia/supertest)
- [nock](https://www.npmjs.com/package/nock)

## Nock

See this post on [using nock](http://codejaxy.com/q/864687/javascript-ajax-xmlhttprequest-nock-nock-is-intercepting-my-request-but-my-ajax-request-is-erroring-out)

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

## Generating tests

To reduce maintenance and human error and reduce size of test files etc. we will instead generate tests baed on data:

Please see `test/helpers` folder for some initial Test gernerator infrastructure:

- `/generators` - generate an ava test spec via config object
- `mock.js` - perform nock configuration of request via config object
- `guess.js` - guess http verb from method name

### Sample generator config

The functionality to be executed/tested (can be reused across most test specs)

```js
async function execute(config = {}) {
  let {
    methodName,
    api,
    args
  } = config
  return await api[methodName](...args)
}
```

The assertion(s) to apply on the result (reusable)

```js
function createAssertion(t, config) {
  let { expect } = config
  return result => {
    t.is(result.x, expect.x)
  }
}
```

The expected data received for each API method

```js
const expected = {
  create: {
    // expected http response body (json) from create call
  },
  remove: {
    // ...
  }
}
```

Generation of a test spec from a configuration Object

```js
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

## Test samples

Sample tests from [bitbucket-server-nodejs](https://github.com/sternba/bitbucket-server-nodejs) can be found in `test/sample` and used for refeence and inspiration to set up the basic test infrastructure, for mocks etc.

