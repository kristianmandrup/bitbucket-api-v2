// change this to override default adapter
const defaults = {
  adapterName: 'xhr',
  adapters: require('./adapters')
}

function Request(options = {}) {
  const adapterName = options.adapterName || defaults.adapterName
  let adapters = options.adapters || defaults.adapters
  const defaultRequestAdapter = adapters[adapterName]

  let requestAdapter = opttions.requestAdapter || defaultRequestAdapter
  return requestAdapter(options)
}

module.exports = {
  Request,
  adapters
}
