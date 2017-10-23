import {
  Logger
} from './logger'
import {
  createTestCase
} from './create-test-case'

export function createTestGenerator(template, opts) {
  return new TestGenerator(template, opts)
}

export class TestGenerator extends Logger {
  constructor(template, opts) {
    super(opts || template)
    this.template = template
    this.methods = template.methods
    this.api = template.api
  }

  get logLabel() {
    let clazz = super.logLabel
    let apiName = this.template.apiName || '<unknown api>'
    return `${clazz} ${apiName}.${this.method}:`
  }

  // generates sth like this:
  // test('Commit: approve', async t => {
  //   mock('approve') // default get
  //   let result = await api.approve(user, repo, node)
  //   t.truthy(result)
  // })

  generateForMethod(method) {
    if (typeof method !== 'string') {
      this.error('Bad argument! generate takes the name of a method to generate test for', {
        method
      })
    }
    this.method = method
    let config = this.methods[method]
    if (!config) {
      const {
        template,
        methods
      } = this
      this.error('No such method in template', {
        method,
        methods
      })
    }

    config.method = method
    config.template = this.template
    this.config = config
    this.log('generateForMethod', {
      [method]: config
    })
    this.createTestCase(this.config, this.opts)
  }

  createTestCase(config, opts) {
    createTestCase(this.config, this.opts).buildTestCase()
  }
}

export default createTestGenerator
