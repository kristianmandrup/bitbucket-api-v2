const singleRepo = require('../mocks/repos/repo-single.json')

function concat(args, moreArgs) {
  return args.concat(moreArgs)
}

const user = 'kmandrup'
const team = 'my-team'
const repo = 'my-repo'

const args = {
  project: [
    user,
    repo
  ]
}

const method = {
  body: singleRepo,
  args: args.project
}

module.exports = {
  apiName: 'repositories',
  methods: {
    'get': method,
    'create': method,
    'getRestriction': method,
    'updateRestriction': method,
    'removeRestriction': method
  }
}
