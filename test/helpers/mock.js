import defaults from './defaults'

function anyPath(uri) {
  return true
}

export function createConfig(config = {}) {
  let keys = Object.keys(config)
  let method = keys[0]
  let path = config[key]
  let request = {
    method,
    path
  }
  let response = {
    code: 200
  }
  return {
    request,
    response
  }
}

function mock(config = {}) {
  if (!config.request) {
    config = createConfig(config)
  }

  let {
    request,
    response,
  } = config

  request = request || {}
  response = response || {}
  request.uri = request.uri || 'localhost'
  request.path = request.path || anyPath // ie. match any path
  // options: can contain custom headers etc. via reqheaders:
  httpMethod = nock(request.uri, request.options || {})[request.verb]
  let requestMethod = httpMethod(request.path, request.body)
  requestMethod.reply(response.code, response.body)
}

export function prepareAll(test, config = {}) {
  test.afterEach(t => {
    nock.restore()
  })
}

export function prepareTest(test, config = {}) {
  mock(config)
}
