const {
  error
} = require('./logger')

function handleError(msg, value) {
  error('ERROR:', msg, value)
  throw new Error(msg)
}

function createArgValidator(methodName) {
  if (typeof methodName !== 'string') {
    throw new TypeError(`createArgValidator: must take a methodName (String) as argument`)
  }
  return function validateArg(arg) {
    if (!arg || typeof arg === 'function') {
      throw new TypeError(`${methodName}: Invalid argument: ${arg}`)
    }
  }
}

function validateArgs(methodName, args, argsLength = 2) {
  args = Array.prototype.slice.call(args, 0, -1)
  const argValidator = createArgValidator(methodName)
  if (args.length !== argsLength) {
    handleError(`${methodName}: Expected ${argsLength} arguments but received ${args.length}`)
  }
  try {
    args.map(argValidator)
  } catch (err) {
    handleError(`${methodName} - ${err.message}`, err)
  }
}
module.exports = {
  handleError,
  createArgValidator,
  validateArgs
}
