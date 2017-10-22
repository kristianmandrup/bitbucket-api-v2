import {
  default as defaultTemplates
} from '../templates'
import {
  createApi,
  prepareForTests
} from '.'
import {
  createTestGenerator
} from './create-test'
import {
  Logger
} from './logger'

function isObject(obj) {
  return obj === Object(obj)
}
export function createTestsGenerator(config, opts) {
  opts = opts || config
  return new TestsGenerator(config, opts)
}

class TestsGenerator extends Logger {
  constructor(config, opts = {}) {
    super(opts)
    this.config = config
  }

  async asyncGenerate(...methods) {
    this.prepare(methods)
    await this.asyncCreateApi()
    this.createTest()
  }

  generate(...methods) {
    if (Array.isArray(methods[0])) {
      methods = methods[0]
    }
    this.prepare(methods)
    this.createApi()
    this.createTest()
  }

  prepare(methods) {
    this.log('prepare', {
      methods
    })
    this.methods = methods
    this.prepareForTests()
    this.resolveName()
  }

  prepareForTests() {
    prepareForTests()
  }

  resolveName() {
    const {
      config
    } = this
    let name
    if (typeof config === 'string') {
      name = config
    } else {
      name = config.name
    }
    this.name = name
  }

  createApi() {
    const {
      config,
      opts
    } = this
    this.log('createApi', {
      config,
      opts
    })

    const _createApi = config.createApi || createApi
    const $api = _createApi(opts)
    this.$api = $api
    this.resolveApi()
  }

  async asyncCreateApi() {
    const {
      config,
      opts
    } = this
    this.log('createApi', {
      config,
      opts
    })

    const _createApi = config.createApi || createApi
    const $api = await _createApi(opts)
    this.$api = $api
    this.resolveApi()
  }

  resolveApi() {
    const {
      $api,
      name,
    } = this
    if (!$api) {
      this.error(`createApi: api could not be created`, {
        createApi: _createApi
      })
    }

    const namedApi = $api[name]
    if (!namedApi) {
      this.error(`createApi: no api found for ${name}`, {
        name,
        api
      })
    }
    const api = $api[name].promised
    if (!api) {
      this.error(`createApi: no .promised api found for ${name}`, {
        namedApi
      })
    }
    this.log('createApi: created', {
      api
    })
    this.api = api
  }

  resolveTemplate() {
    const {
      name,
      config,
      opts,
      api
    } = this
    const templates = config.templates || defaultTemplates
    let template = templates[name]
    if (!template) {
      this.error(`resolveTemplate: could not resolve template ${name}`, {
        templates,
        name
      })
    }
    template.api = api
    this.log('resolveTemplate', {
      name,
      template,
    })
    this.template = template
  }

  createTest() {
    this.resolveTemplate()
    let {
      methods,
      template,
      opts
    } = this
    this.testMethodGenerator = createTestGenerator(template, opts)

    if (methods.length === 0) {
      if (!isObject(template.methods)) {
        this.error(`createTest: .methods property of template must be a map of methods => test configuration (ie. an Object), was: ${typeof template.methods}`)
      }
      methods = Object.keys(template.methods)
    }
    this.log('createTest: generate test for each method', {
      methods
    })

    methods.map(method => {
      this.generateMethodTest(method)
    })
  }

  generateMethodTest(method) {
    return this.testMethodGenerator.generateForMethod(method)
  }
}
