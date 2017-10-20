const {
  log
} = console

function isSubApi(value) {
  return !value.createApi
}

function isApiFactory(value) {
  return !isSubApi(value)
}

module.exports = function createApiEnricher(apiModel, opts) {
  return apis => {
    // TODO: generate all instead
    let apiNames = Object.keys(apis)
    apiNames.map(name => {
      let value = apis[name]
      if (name === 'methods' || typeof value !== 'object') return

      // recurse if object
      if (isSubApi(value)) {
        log('recurse sub api', name, value)
        const enrich = createApiEnricher(apiModel, opts)
        enrich(value)
      } else if (isApiFactory(value)) {
        let apiFactory = value.createApi
        log('add to api', {
          name,
          apiFactory,
          type: typeof apiFactory
        })
        apiModel[name] = apiFactory(apiModel, opts)
      }
    })
    return apiModel
  }
}