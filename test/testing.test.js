import {
  generateTest
} from './helpers'

async function execute(config = {}) {
  let {
    methodName,
    api,
    args
  } = config
  return await api[methodName](...args)
}

function createComparer(t, config) {
  let {
    expect
  } = config
  return result => {
    t.is(result.x, expect.x)
  }
}

// api method expected JSON responses!
const expected = {
  get: {
    // expected http response body (json) from create call
  },
  getAll: {
    // ...
    x: 2
  }
}

generateTest({
  methodName: 'getAll',
  // forced response in mock
  body: {
    x: 2
  },
  expected,
  execute,
  createComparer,
  args: []
})
