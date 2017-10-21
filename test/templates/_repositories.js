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

const method = {
  body: singleRepo,
  args: args.repo
}

module.exports = {
  apiName: 'repositories',
  methods: {
    get: method,
    create: method,
    createPullRequest: {
      body: singleRepo,
      args: merge(args.repo, {
        type: 'pull'
      })
    },
    commit: {
      body: singleRepo,
      args: args.commit
    },
    getBranches: method,
    getCommit: method
  }
  // ... more test data templates
}
