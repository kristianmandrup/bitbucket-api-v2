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

  generate(...methods) {
    this.log('generate', {
      methods
    })
    const {
      config,
      opts
    } = this

    prepareForTests()

    let name
    if (typeof config === 'string') {
      name = config
    } else {
      name = config.name
    }
    const _createApi = config.createApi || createApi

    const $api = _createApi(opts)
    const api = $api[name].promised

    const templates = config.templates || defaultTemplates
    let template = templates[name]
    template.api = api
    this.log('generate', {
      name,
      template,
    })

    this.testMethodGenerator = createTestGenerator(template, this.opts)

    if (methods.length === 0) {
      if (!isObject(template.methods)) {
        this.error(`.methods property of template must be a map of methods => test configuration (ie. an Object), was: ${typeof template.methods}`)
      }
      methods = Object.keys(template.methods)
    }
    this.log('generate: generate test for each method', {
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
