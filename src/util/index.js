const _ = require('lodash')
const constants = require('./constants')
const fluid = require('./fluid')
const createApiEnricher = require('./enrich')
const createPromisedApi = require('./promised')

function validateArg(arg) {
  if (!arg || typeof arg === 'function') {
    throw new Error(`Invalid argument: ${arg}`)
  }
}

module.exports = {
  _,
  constants,
  validateArg,
  fluid,
  createApiEnricher,
  createPromisedApi
}
