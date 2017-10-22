const singleRepo = require('../mocks/repos/repo-single.json')

function concat(args, moreArgs) {
  return args.concat(moreArgs)
}

const user = 'kmandrup'
const team = 'my-team'
const repo = 'my-repo'
const forkPath = `https://api.bitbucket.org/2.0/repositories/${user}/${repo}.git`

const response = {
  links: {
    forks: {
      href: forkPath
    }
  },
  parent: {
    links: {
      self: {
        href: forkPath
      }
    }
  }
}

const args = {
  project: [
    user,
    repo
  ]
}

args.commit = concat(args.project, {
  author: 'unknown@gmail.com',
  message: 'first commit',
  files: [{
    'Readme.md': 'hello world'
  }]
})

const method = {
  body: singleRepo,
  args: args.project
}

module.exports = {
  apiName: 'repositories',
  methods: {
    get: method,
    create: method,
    createPullRequest: {
      body: singleRepo,
      args: concat(args.project, {
        type: 'pull'
      })
    },
    commit: {
      body: singleRepo,
      args: args.commit
    },
    getBranches: method,
    getCommit: {
      body: singleRepo,
      args: concat(args.project, '123')
    },
    getByUser: {
      body: singleRepo,
      args: [
        user
      ]
    },
    getByTeam: {
      body: singleRepo,
      args: [
        team
      ]
    },
    getForks: method,
    getForksFromResponse: {
      path: forkPath,
      body: singleRepo,
      args: [
        response
      ]
    },
    getParentFromResponse: {
      body: singleRepo,
      args: [
        response
      ]
    },
  }
  // ... more test data templates
}
