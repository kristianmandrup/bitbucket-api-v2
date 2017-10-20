// change context (this) of each function passed in requestApi
// as if these functions were defined here and have access to the vars in this scope ;)

function switchEachFunctionContext(api, context) {
  const customApiMethods = Object.keys(api)
  const customRequestApi = customApiMethods.reduce((acc, key) => {
    acc[key] = acc[key].bind(context)
    return acc
  }, {})

}

const {
  promisify
} = require('util')

const {
  createPromisedApi
} = require('../../../util')

module.exports = {
  promisify,
  createPromisedApi,
  switchEachFunctionContext,
  defaults: require('./defaults')
}
