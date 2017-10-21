const singleRepo = require('../mocks/repos/repo-single.json')

function merge(args, moreArgs) {
  return args.concat(moreArgs)
}

const args = {
  repo: [
    'kmandrup',
    'my-repo'
  ]
}

args.commit = merge(args.repo, {
  author: 'unknown@gmail.com',
  message: 'first commit',
  files: [{
    'Readme.md': 'hello world'
  }]
})

module.exports = {
  apiName: 'repositories',
  methods: {
    get: {
      body: singleRepo,
      // expected: singleRepo, (defaults to body)
      // execute,
      // createAssertion,
      args: args.repo
    },
    create: {
      body: singleRepo,
      args: args.repo
    },
    createPullRequest: {
      body: singleRepo,
      args: merge(args.repo, {
        type: 'pull'
      })
    },
    commit: {
      body: singleRepo,
      args: args.commit
    }
  }
  // ... more test data templates
}
