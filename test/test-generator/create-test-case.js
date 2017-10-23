import test from 'ava'
import {
  mock
} from './mock'
import {
  Logger
} from './logger'

// generate test case using configuration
export function createTestCase(config, opts) {
  return new TestCase(config, opts)
}

export class TestCase extends Logger {
  constructor(config, opts) {
    super(opts)
    let {
      template
    } = config
    this.config = config
    this.template = template
    this.api = template.api
    this.method = config.method
  }

  get testLabel() {
    let apiName = this.template.apiName || '<unknown api>'
    return `${apiName}: ${this.method}`
  }

  buildTestCase() {
    const {
      config
    } = this

    let {
      createAssertion,
    } = config

    test(this.testLabel, async t => {
      this.assertion = (createAssertion || this.createAssertion).bind(this)
      this.executeTest(t)
    })
  }

  async executeTest(t) {
    const {
      config
    } = this
    let {
      execute
    } = config
    execute = (execute || this.execute).bind(this)
    this.configureMock()
    const assert = this.assertion(t, config)
    if (!assert) {
      this.error('no assertion defined', config)
    }
    const result = await execute(config)
    assert(t, result)
  }

  configureMock() {
    const {
      config,
      opts
    } = this
    // set to false in config to disable mocking
    const prepareMock = config.mock || mock
    if (prepareMock) {
      this.log('configureMock: prepareMock', {
        config,
        opts
      })

      prepareMock(config, opts)
    } else {
      this.log('skip mock', {
        mock: prepareMock
      })
    }
  }

  // sample execute
  async execute(config = {}) {
    let {
      method,
      api,
      args
    } = config
    this.log('execute', {
      method,
      args
    })
    if (!method) {
      this.error('method not defined in config', {
        config
      })
    }

    let apiMethod = this.api[method]
    if (typeof apiMethod !== 'function') {
      this.error(`api method ${method} is not available`)
    }
    if (!args) {
      this.warn(`no args defined for ${method}, assuming call with no args`)
      args = []
    }
    if (!Array.isArray(args)) {
      this.error('missing args for API call')
    }

    return await apiMethod(...args)
  }

  // sample compare function factory
  createAssertion(t, config = {}) {
    let {
      expected,
      body
    } = config
    expected = expected || body
    return result => {
      this.log('assert', {
        result,
        expected
      })
      t.truthy(result)
      // t.is(result, expect)
    }
  }
}
