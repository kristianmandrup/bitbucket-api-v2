const singleRepo = require('../mocks/repos/repo-single.json')

function concat(args, moreArgs) {
  return args.concat(moreArgs)
}

const user = 'kmandrup'
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

export {
  singleRepo,
  concat,
  user,
  repo,
  args,
  method,
}
