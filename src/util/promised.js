const {
  promisify
} = require('util')

// allow overriding default way to promisify if needed (such as Node < 8)
// pass option promised: false to disable generation of promise API
module.exports = function createPromisedApi(api = {}, opts = {}) {
  if (opts.promised === false) return {}

  let _createPromisedApi = opts.createPromisedApi || defaultCreatePromisedApi
  return _createPromisedApi(api, opts)
}

function defaultCreatePromisedApi(api, opts = {}) {
  let apiKeys = Object.keys(api)
  let _promisify = opts.promisify || promisify
  let promisedApi = apiKeys.reduce((acc, name) => {
    let apiMethod = api[name]

    // skip if entry is not a function
    if (typeof apiMethod !== 'function') return acc

    let promisedMethod = _promisify(apiMethod)
    acc[name] = promisedMethod
    return acc
  }, {})

  api.name = undefined
  return promisedApi
}
