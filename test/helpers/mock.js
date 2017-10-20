import nock from 'nock'

function anyPath(uri) {
  return true
}

function hasSingleKey(config) {
  return typeof config === 'object' && Object.keys(config).length === 1
}

// pass just path as string and we will try to determine from name alone
// otherwise pass object such as: {delete: 'cancelVote'}
export function createConfig(config, opts = {}) {
  let verb, methodName
  if (typeof config === 'string') {
    methodName = config
  }
  let {
    body,
    path
  } = opts

  // use "as is" if a normal multi-key config
  if (!hasSingleKey(config)) return config

  let keys = Object.keys(config)
  verb = keys[0]
  methodName = config[key]
  request = {
    verb,
    methodName
  }

  code = config.code || opts.code || 200

  let response = {
    code,
    body
  }
  return {
    request,
    response
  }
}

import {
  guessRequestType
} from './guess'

export function mock(config = {}) {
  if (!config.request) {
    config = createConfig(config)
  }

  let {
    request,
    response,
    methodName
  } = config

  request = request || {}
  response = response || {}
  request.uri = request.uri || 'localhost'
  let httpVerb = request.verb || guessRequestType(methodName) || 'get'

  request.path = request.path || anyPath // ie. match any path
  // options: can contain custom headers etc. via reqheaders:
  let nockInstance = nock(request.uri, request.options || {})
  let verbMethod = nockInstance[httpVerb].bind(nockInstance)
  let requestMethod = verbMethod(request.path)
  requestMethod.reply(response.code, response.body)
}

export function prepareMock(config = {}) {
  mock(config)
}

export default {
  mock,
  prepareMock
}
