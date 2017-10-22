import nock from 'nock'

import {
  guessRequestType
} from './guess'

import {
  connection
} from './connection'


const {
  log
} = console

function acceptAny(value) {
  return true
}

function hasSingleKey(config) {
  return typeof config === 'object' && Object.keys(config).length === 1
}

// pass just path as string and we will try to determine from name alone
// otherwise pass object such as: {delete: 'cancelVote'}
export function createConfig(config, opts = {}) {
  let verb, method
  if (typeof config === 'string') {
    method = config
  }
  let {
    body,
    path
  } = opts

  // use "as is" if a normal multi-key config
  if (!hasSingleKey(config)) return config

  let keys = Object.keys(config)
  verb = keys[0]
  method = config[key]
  request = {
    verb,
    method
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
  Logger
} from './logger'

export function mock(config, opts = {}) {
  return new Mock(config, opts).build()
}

export class Mock extends Logger {
  constructor(config, opts) {
    super(opts || config)
    this.config = config
  }

  // TODO: split up in smaller functions
  build() {
    let {
      config,
      opts
    } = this
    this.log('build mock', {
      config,
      opts
    })
    if (!config.request) {
      config = createConfig(config)
    }
    let {
      request,
      response,
      method,
      accessToken,
      code,
      body,
      data,
      query
    } = config
    accessToken = accessToken || opts.accessToken
    request = request || {}
    response = response || {}
    let hostname = connection.hostname
    let httpVerb = request.verb || guessRequestType(method) || 'get'

    let path = request.path || opts.path || acceptAny // ie. match any path
    // ensure we are using v.2 API
    if (typeof path === 'string') {
      path = new RegExp(`/2.0/${path}`)
    }

    hostname = `https://${hostname}`
    code = code || opts.code || response.code || 200
    body = body || opts.body || response.body || {}

    // options: can contain custom headers etc. via reqheaders:
    let nockInstance = nock(hostname, request.options || {})
    let verbMethod = nockInstance[httpVerb]
    this.log('configure nock', {
      method,
      hostname,
      request: request.options,
      path,
      httpVerb,
      verbMethod,
      code,
      body,
      query,
      data
    })
    if (!verbMethod) {
      this.error(`No .${httpVerb} method available on nock instance`, {
        httpVerb,
        nockInstance
      })
    }
    verbMethod = verbMethod.bind(nockInstance)
    this.log('find verb method')

    let requestMethod
    data = data || acceptAny
    try {
      if (['post', 'put', 'patch'].includes(httpVerb)) {
        this.log(`configure ${httpVerb} method`, {
          path,
          data
        })

        requestMethod = verbMethod(path, data)
      } else {
        requestMethod = verbMethod(path)
      }
    } catch (err) {
      this.error(err.message, {
        err
      })
    }

    this.log('happy', {
      requestMethod
    })
    if (httpVerb === 'get') {
      if (query) {
        requestMethod.query(query)
      }
    }

    if (!requestMethod) {
      this.error('Invalid http verb request method', {
        path,
        verbMethod,
        requestMethod
      })
    }

    this.log('build: reply', {
      requestMethod,
      code,
      body
    })

    requestMethod.reply(code, body)
    return nockInstance
  }
}
