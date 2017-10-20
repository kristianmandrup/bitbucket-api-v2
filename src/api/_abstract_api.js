function createAbstractApi($api, opts = {}) {
  return {
    $api,

    $createListener(callback) {
      return function callbackRunner(err, response) {
        if (err) {
          if (callback) {
            callback(err)
          }
          return
        }

        if (callback) {
          callback(err, response)
        }
      }
    }
  }
}

module.exports = {
  createAbstractApi
}
