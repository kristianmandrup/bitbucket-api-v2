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

module.exports = {
  _,
  constants,
  createArgValidator,
  fluid,
  createApiEnricher,
  createPromisedApi
}
