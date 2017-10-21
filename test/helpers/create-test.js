import test from 'ava'
import {
  mock
} from './mock'
import {
  Logger
} from './logger'

export function createTestGenerator(template = {}) {
  return new TestGenerator(template)
}

export class TestGenerator extends Logger {
  constructor(template, opts) {
    super(opts || template)
    this.template = template
    this.api = template.api
  }

  get logLabel() {
    let clazz = super.label
    let apiName = this.template.apiName || '<unknown api>'
    return `${clazz} ${apiName}: ${this.method}`
  }

  get testLabel() {
    let apiName = this.template.apiName || '<unknown api>'
    return `${apiName}: ${this.method}`
  }

  // test('Commit: approve', async t => {
  //   mock('approve') // default get
  //   let result = await api.approve(user, repo, node)
  //   t.truthy(result)
  // })
  generate(method) {
    this.method = method
    let config = this.template[method] || this.template.methods[method]
    this.config = config
    this.log('generate', {
      [method]: config
    })
    this.createTestCase()
  }
  // generate test case using configuration
  createTestCase() {
    const {
      config
    } = this

    let {
      request,
      execute,
      methodName,
      createAssertion,
    } = config

    test(this.testLabel, async t => {
      createAssertion = (createAssertion || this.createAssertion).bind(this)
      execute = (execute || this.execute).bind(this)
      this.configureMock()
      const assert = createAssertion(t, config)
      if (!assert) {
        this.error('no assertion defined', config)
      }
      const result = await execute(config)
      assert(t, result)
    })
  }

  configureMock() {
    const {
      config
    } = this
    const {
      requestType,
      methodName,
      body,
      data,
    } = config

    const mockConfig = requestType ? {
      [requestType]: methodName
    } : methodName

    // set to false in config to disable mocking
    const prepareMock = config.mock || mock
    const mockOpts = {
      data,
      body
    }

    if (prepareMock) {
      this.log('generate: call prepareMock', {
        mockConfig,
        mockOpts
      })

      prepareMock(mockConfig, mockOpts)
    }
  }

  // sample execute
  async execute(config = {}) {
    let {
      methodName,
      api,
      args
    } = config
    this.log('execute', {
      methodName,
      args
    })
    let apiMethod = this.api[methodName]
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

export default createTestGenerator
