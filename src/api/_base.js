const {
  _,
  constants,
  createPromisedApi,
  fluid,
  log,
  handleError,
  validateArgs
} = require('../util')

const createAbstractApi = require('./_abstract_api')

// remove first / of any path argument to be joined, if present
function prepareArg(arg) {
  if (typeof arg === 'object') {
    handleError('Invalid URI argument', arg)
  }
  return String(arg).replace(/^\//, '')
}

function join(...args) {
  return args.filter(val => val).map(prepareArg).map(encodeURI).join('/')
}

function buildUri(...args) {
  return join(...args)
}

function uriBuilder(prefix) {
  return (...args) => {
    return join(prefix, ...args)
  }
}

module.exports = {
  _,
  constants,
  fluid,
  createPromisedApi,
  createAbstractApi,
  log,
  handleError,
  validateArgs,
  buildUri,
  uriBuilder,
  join
}
