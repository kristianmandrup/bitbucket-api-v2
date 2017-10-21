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

export function createTestsGenerator(config, opts) {
  return new TestsGenerator(config, opts || config).generate()
}

class TestsGenerator extends Logger {
  constructor(config, opts = {}) {
    super(opts)
    this.config = config
  }

  generate() {
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

    const $api = _createApi({
      logging: true
    })
    const api = $api[name].promised

    const templates = config.templates || defaultTemplates
    let template = templates[name]
    template.api = api
    this.log('generate', {
      name,
      template
    })
    return createTestGenerator(template, this.opts)
  }
}
