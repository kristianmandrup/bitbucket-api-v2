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

function createMethodConcat(base) {
  const argConcat = typeof base === 'function' ? base : createConcat(base)
  return function (...moreArgs) {
    return {
      args: argConcat(...moreArgs)
    }
  }
}

const projConcat = createConcat(args.project)
const projMethod = createMethodConcat(args.project)

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
  projConcat,
  projMethod,
  user,
  repo,
  args,
  method,
}
