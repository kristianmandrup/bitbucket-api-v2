import {
  singleRepo,
  concat,
  prjConcat,
  projMethod,
  user,
  repo,
  args,
  method
} from './_base'

const team = 'my-team'
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

const commitId = '123'
const commit = {
  author: 'unknown@gmail.com',
  message: 'first commit',
  files: [{
    'Readme.md': 'hello world'
  }]
}

const commitMethod = projMethod(commit)

const pr = {
  type: 'pull'
}

module.exports = {
  apiName: 'repositories',
  methods: {
    get: method,
    create: method,
    createPullRequest: projMethod(pr),
    commit: commitMethod,
    getBranches: method,
    getCommit: projMethod(commit, commitId),
    getByUser: projMethod(user),
    getByTeam: projMethod(team),
    getForks: method,
    getForksFromResponse: projMethod(response),
    getParentFromResponse: projMethod(response)
  },
  fluids: [
    'forProject'
  ]
}
