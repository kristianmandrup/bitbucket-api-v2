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
  return new Mock(config, opts).generate()
}

export class Mock extends Logger {
  constructor(config, opts) {
    super(opts || config)
    this.config = config
    this.configure()
  }

  configure() {
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
    response = response || {}
    this.accessToken = accessToken || opts.accessToken
    this.code = code || opts.code || response.code || 200
    this.body = body || opts.body || response.body || {}
    this.request = request || {}
    this.response = response
    this.method = method

    this
      .configHostname()
      .configPath()
      .configVerb()
  }

  configHostname() {
    this.hostname = `https://${connection.hostname}`
    return this
  }

  configPath() {
    const {
      request
    } = this
    let path = request.path || acceptAny // ie. match any path
    // ensure we are using v.2 API
    if (typeof path === 'string') {
      path = new RegExp(`/2.0/${path}`)
    }
    this.path = path
    return this
  }

  configVerb() {
    const {
      request,
      method
    } = this
    this.log('configVerb', {
      request,
      method
    })
    let httpVerb = request.verb || guessRequestType(method) || 'get'
    this.log('httpVerb', httpVerb)
    this.httpVerb = httpVerb
    return this
  }

  generate() {
    this
      .createNock()
      .createRequest()
      .createReply()
  }

  createNock() {
    const {
      hostname,
      request,
      httpVerb,
    } = this
    // options: can contain custom headers etc. via reqheaders:
    let nockInstance = nock(hostname, request.options || {})
    let verbMethod = nockInstance[httpVerb]
    this.log('createNock', {
      hostname,
      request,
      httpVerb,
      verbMethod
    })
    if (!verbMethod) {
      this.error(`No .${httpVerb} method available on nock instance`, {
        httpVerb,
        nockInstance
      })
    }
    this.nockInstance = nockInstance
    verbMethod = verbMethod.bind(nockInstance)
    this.verbMethod = verbMethod
    return this
  }

  createRequest() {
    let {
      nockInstance,
      verbMethod,
      path,
      httpVerb,
      data,
      query
    } = this
    this.log('createRequest', {
      path,
      httpVerb,
      data,
      query
    })
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
      // add query (url params) for .get
      if (httpVerb === 'get') {
        if (query) {
          requestMethod.query(query)
        }
      }
      this.requestMethod = requestMethod
    } catch (err) {
      this.error(err.message, {
        err
      })
    }
    return this
  }

  createReply() {
    const {
      requestMethod,
      code,
      body
    } = this
    this.log('createReply', {
      code,
      body
    })
    requestMethod.reply(code, body)
    return this
  }
}
