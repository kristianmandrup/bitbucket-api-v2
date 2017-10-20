import nock from 'nock'

export function prepareForTests(test, config = {}) {
  test.afterEach(t => {
    nock.restore()
  })
}
