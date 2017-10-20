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

import {
  connection
} from './connection'


const {
  log
} = console

export function mock(config = {}, opts = {}) {
  log('mock', {
    config,
    opts
  })
  if (!config.request) {
    config = createConfig(config)
  }
  let {
    request,
    response,
    methodName,
    accessToken,
    code,
    body
  } = config
  accessToken = accessToken || opts.accessToken
  request = request || {}
  response = response || {}
  let hostname = connection.hostname
  let httpVerb = request.verb || guessRequestType(methodName) || 'get'

  let path = request.path || opts.path || anyPath // ie. match any path
  // ensure we are using v.2 API
  if (typeof path === 'string') {
    path = `/2.0/${path}`
  }

  hostname = `https://${hostname}`

  // options: can contain custom headers etc. via reqheaders:
  let nockInstance = nock(hostname, request.options || {})

  let headers = {
    Authorization: `Bearer ${accessToken}`
  }
  // nockInstance.defaultReplyHeaders(headers)
  let verbMethod = nockInstance[httpVerb].bind(nockInstance)
  let requestMethod = verbMethod(path)

  code = code || opts.code || response.code || 200
  body = body || opts.body || response.body

  console.log('nock config:', {
    hostname,
    path,
    httpVerb,
    headers,
    code,
    body
  })
  requestMethod.reply(code, body)
}

export function prepareMock(config = {}) {
  mock(config)
}

export default {
  mock,
  prepareMock
}
