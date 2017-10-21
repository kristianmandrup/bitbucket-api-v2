const singleRepo = require('../mocks/repos/repo-single.json')

module.exports = {
  apiName: 'repositories',
  methods: {
    get: {
      methodName: 'get',
      body: singleRepo,
      // expected: singleRepo, (defaults to body)
      // execute,
      // createAssertion,
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
