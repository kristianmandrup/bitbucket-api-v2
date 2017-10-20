module.exports = function createApiEnricher(apiModel, opts) {
  return apis => {
    // TODO: generate all instead
    let apiNames = Object.keys(apis)
    apiNames.map(name => {
      let value = apis[name]
      if (typeof values === 'function') {
        apiModel[name] = new apis[name].createApi(apiModel, opts)
      }
      // recurse if object
      if (typeof value === 'object') {
        const enrich = createApiEnricher(apiModel, opts)
        enrich(value)
      }
    })
    return apiModel
  }
}
