import defaults from './defaults'

function anyPath(uri) {
  return true
}

function hasSingleKey(config) {
  return typeof config === 'object' && Object.keys(config).length === 1
}

// pass just path as string and we will try to determine from name alone
// otherwise pass object such as: {delete: 'cancelVote'}
export function createConfig(config, opts = {}) {
  let verb
  if (typeof config === 'string') {
    methodName = config
  }
  let {
    data,
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
    methodName,
    data
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

function mock(config = {}) {
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
  httpMethod = nock(request.uri, request.options || {})[request.verb]
  let requestMethod = httpMethod(request.path, request.data)
  requestMethod.reply(response.code, response.body)
}

export function prepareMock(config = {}) {
  mock(config)
}

export default {
  prepareMock
}
