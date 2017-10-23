# Test

The test are written using `async`/`await` and:

- [ava](https://github.com/avajs/ava)
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

```js
import {
  createTestsGenerator
} from '../helpers'

createTestsGenerator('repositories')
  .generate('get', 'create')

createTestsGenerator('teams')
  .generate() // generate for all templates available
```

You can customize the generator by passing options such as `mock` (either a mock function or `false` to disable mocking) and `createApi` (API factory function).

```js
const generator = createTestsGenerator({
  name: 'repositories',
  mock: false,
  logging: true,
  async createApi(config) {
    await createAuthenticatedApi(config)
  }
})

// Note: if createApi is async we have to use the async variant of generate!
await generator.asyncGenerate([
  'get',
  'create',
  // ... add more methods to generate tests for ;)
])
```

### Test data templates

The test data templates are defined in `test/templates`.
A typical template, such as `_repositories.js` returns an object like this:

```js
const singleRepo = require('../mocks/repos/repo-single.json')

module.export = {
  apiName: 'repositories',
  methods: {
    get: {
      methodName: 'get',
      body: singleRepo,
      expected: singleRepo,
      // execute, // custom function - functionality to execute (and test)
      // createAssertion, // custom function - perform assertions on mocked response
      args: [
        'kmandrup',
        'my-repo'
      ]
    },
    create: {

    },
    // ... more test data templates
  }
}
```

Start with `test/repos/repositories.test.js` for an example using `test/templates/_repositories.js` test data template.

### Test generator customization

Please see `test/helpers` folder for some initial Test gernerator infrastructure:

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

## Test samples

Sample tests from [bitbucket-server-nodejs](https://github.com/sternba/bitbucket-server-nodejs) can be found in `test/sample` and used for refeence and inspiration to set up the basic test infrastructure, for mocks etc.

