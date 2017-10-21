const _ = require('lodash')
const constants = require('./constants')
const fluid = require('./fluid')
const createApiEnricher = require('./enrich')
const createPromisedApi = require('./promised')

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

const {
  log,
  error
} = console

function handleError(msg, value) {
  error('ERROR:', msg, value)
  throw msg
}

module.exports = {
  _,
  constants,
  createArgValidator,
  fluid,
  log,
  handleError,
  createApiEnricher,
  createPromisedApi
}
