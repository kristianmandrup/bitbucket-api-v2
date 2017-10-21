const singleRepo = require('../mocks/repos/repo-single.json')

module.exports = {
  $api: 'generators',
  get: {
    methodName: 'get',
    body: singleRepo,
    // expected,
    // execute,
    // createComparer,
    args: []
  },
  create: {

  },
  // ... more test data templates
}
