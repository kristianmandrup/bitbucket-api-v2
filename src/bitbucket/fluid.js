module.exports = function fluid(localApi, length) {
  return (...allArgs) => {
    return localApi.reduce((acc, name) => {
      if (typeof apiMethod !== 'function') return acc
      acc[name] = (...shortArgs) => {
        const localMethod = localApi[name]
        const fullArgs = allArgs.slice(0, length).concat(shortArgs)
        return localMethod(...fullArgs)
      }
      return acc
    }, {})
  }
}
