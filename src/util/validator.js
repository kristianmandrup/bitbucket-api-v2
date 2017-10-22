const {
  error
} = require('./logger')

function handleError(msg, value) {
  error('ERROR:', msg, value)
  throw msg
}

function createArgValidator(methodName) {
  if (typeof methodName !== 'string') {
    throw `createArgValidator: must take a methodName (String) as argument`
  }
  return function validateArg(arg) {
    if (!arg || typeof arg === 'function') {
      throw `${methodName}: Invalid argument: ${arg}`
    }
  }
}

function validateArgs(methodName, args, argsLength = 2) {
  args = [].slice.call(args, 0, -1)
  const argValidator = createArgValidator(methodName)
  if (args.length !== argsLength) {
    handleError(`${methodName}: Expected ${argsLength} arguments but received ${args.length}`)
  }
  args.map(argValidator)
}
module.exports = {
  handleError,
  createArgValidator,
  validateArgs
}
