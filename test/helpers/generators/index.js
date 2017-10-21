// test('Commit: approve', async t => {
//   mock('approve') // default get
//   let result = await api.approve(user, repo, node)
//   t.truthy(result)
// })

import {
  prepareMock
} from '../mock'
import defaults from './defaults'

const {
  log
} = console

function createTestGenerator(test, template = {}) {
  return new TestGenerator(test, template)
}

class TestGenerator {
  constructor(test, template = {}) {
    this.test = test
    this.template = template
  }

  get label() {
    return `${this.template.$api}: ${this.method}`
  }

  generate(method) {
    this.method = method
    let config = this.template[method]
    log('generateTest', {
      test,
      config
    })
    // generate test case using configuration
    let testCase = {}
    let {
      expected,
      methodName,
      requestType,
    } = config

    config.expect = expected[methodName]

    test(this.label, async t => {
      let {
        request,
        execute,
        body,
        data
      } = config

      const createComparer = config.createComparer || defaults.createComparer
      const compare = createComparer(t, config)

      const mockConfig = requestType ? {
        [requestType]: methodName
      } : methodName

      const prepareMock = config.prepareMock || mock.prepareMock
      const mockOpts = {
        data,
        body
      }

      prepareMock(mockConfig, mockOpts)
      const result = await execute(config)
      compare(t, result)
    })

  }
}

module.exports = {
  createTestGenerator
}
