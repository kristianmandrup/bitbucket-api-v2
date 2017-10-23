import test from 'ava'
import nock from 'nock'

export function prepareForTests(config = {}) {
  test.afterEach(t => {
    nock.restore()
  })

  test.beforeEach(t => {
    // nock.restore()
  })
}
