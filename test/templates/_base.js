const singleRepo = require('../mocks/repos/repo-single.json')

const user = 'kmandrup'
const repo = 'my-repo'

const args = {
  project: [
    user,
    repo
  ]
}

function concat(baseArgs, moreArgs) {
  if (!moreArgs) {
    moreArgs = [].concat(baseArgs)
    baseArgs = args.project
  }
  return baseArgs.concat(moreArgs)
}

const method = {
  body: singleRepo,
  args: args.project
}

export {
  singleRepo,
  concat,
  user,
  repo,
  args,
  method,
}
