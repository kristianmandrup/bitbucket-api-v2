const {
  _,
  fluid,
  constants,
  log,
  handleError,
  validateArgs,
  createPromisedApi,
  createAbstractApi
} = require('../_base')

function buildUri(username, repoSlug, action) {
  let baseUri = `repositories/${encodeURI(username)}`
  if (repoSlug) {
    baseUri = `${baseUri}/${encodeURI(repoSlug)}`
  }
  return action ? [baseUri, action].join('/') : baseUri
}

module.exports = {
  _,
  fluid,
  constants,
  log,
  handleError,
  validateArgs,
  createPromisedApi,
  createAbstractApi,
  buildUri
}
