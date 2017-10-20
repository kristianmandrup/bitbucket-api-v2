module.exports = function createAbstractApi($api, opts = {}) {
  return {
    $api,

    $createListener(callback) {
      if (typeof callback !== 'function') {
        if (callback === undefined) return
        console.error('callback is not a function', {
          callback
        })
        throw new Error('callback is not a function')
      }

      return function callbackRunner(err, response) {
        if (err) {
          callback(err)
          return
        }

        if (callback) {
          callback(err, response)
        }
      }
    }
  }
}
