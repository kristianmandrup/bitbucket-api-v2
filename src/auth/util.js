// default error handler
const defaults = {
  errorHandler(msg, value) {
    console.error(msg, value)
    throw new Error(msg)
  },
  logger(...msgs) {
    console.log(...msgs)
  }
}

let errorHandler = defaults.errorHandler

function setErrorHandler(opts = {}) {
  return opts.errorHandler || defaults.errorHandler
}

function missing(name) {
  errorHandler(`${method}: missing ${name}`)
}

const required = [
  'appName',
  'consumerKey',
  'consumerSecret'
]

const stringProps = [
  'appName',
  'consumerKey',
  'consumerSecret',
  'refreshToken',
  'configPath'
]

function typeError(name, type, actualType) {
  errorHandler(`${method}: ${name} must be of type ${type}, was: ${actualType}`)
}

function createValidator(method) {
  return function validateOpts(opts) {
    required.map(name => {
      if (!opts[name]) missing(method, name)
    })

    stringProps.map(name => {
      let value = opts[name]
      let type = typeof value
      if (type !== 'string') typeError(method, name, 'string', type)
    })
  }
}

module.exports = {
  errorHandler,
  createValidator,
  defaults
}
