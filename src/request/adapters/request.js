function prepareRequestOpts(xhrOptions = {}) {
  let {
    method,
    url,
    json
  } = xhrOptions
  let requestOpts = {
    url,
    json,
    // ...
  }

  if (xhrOptions.contentType === 'multipart/form-data') {
    requestOpts.formData = json
  }
  if (xhrOptions.contentType === 'multipart/related') {
    requestOpts.multipart = {
      // configure
    }
  }
  // more fiddling ;)
  return requestOpts
}

const {
  defaults
} = require('./util')


module.exports = function RequestAdapter(_options) {
  const $defaults = defaults
  const $options = _.defaults({}, _options, $defaults)

  // return API object
  return {
    sendXhrRequest(xhrOptions, done) {
      let {
        method,
        url,
        json
      } = xhrOptions

      function responseHandler(error, response, body) {
        // return result via done
      }

      // expands on properties of xhr, customize as needed
      let reqOpts = prepareRequestOpts(xhrOptions)
      method = method.toLowerCase()
      request[method](reqOpts, responseHandler)
    }
  }
}
