const singleRepo = require('../mocks/repos/repo-single.json')

const args = [
  'kmandrup',
  'my-repo'
]

module.exports = {
  apiName: 'repositories',
  methods: {
    get: {
      body: singleRepo,
      // expected: singleRepo, (defaults to body)
      // execute,
      // createAssertion,
      args
    },
    create: {
      body: singleRepo,
      args
    },
    // ... more test data templates
  }
}
