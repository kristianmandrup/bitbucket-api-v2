const singleRepo = require('../mocks/repos/repo-single.json')

const user = 'kmandrup'
const repo = 'my-repo'

const args = {
  project: [
    user,
    repo
  ]
}

function createConcat(baseArgs) {
  return function (...moreArgs) {
    return baseArgs.concat(...moreArgs)
  }
}

const prjConcat = createConcat(args.project)

function concat(baseArgs, ...moreArgs) {
  return baseArgs.concat(...moreArgs)
}

const method = {
  body: singleRepo,
  args: args.project
}

export {
  singleRepo,
  concat,
  createConcat,
  prjConcat,
  user,
  repo,
  args,
  method,
}
