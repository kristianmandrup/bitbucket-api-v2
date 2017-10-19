// test('Commit: approve', async t => {
//   prepareStub($stubs, expected)
//   let result = await api.approve(user, repo, node)
//   t.truthy(result)
// })

// sample execute
async function execute(config = {}) {
  let {
    methodName,
    api,
    args
  } = config
  return await api[methodName](...args)
}

function prepareStub(stubs, config = {}) {
  let {
    expect,
    requestType,
    methodName
  } = config

  let httpVerb = requestType || guessRequestType(methodName) || 'get'
}

// sample compare function factory
function createComparer(t, config = {}) {
  let {
    expect
  } = config
  return result => {
    t.is(result.x, expect.x)
  }
}

function generateTest(test, config = {}) {
  // generate test case using configuration
  let testCase = {}
  let {
    createComparer,
    expected,
    methodName
  } = config

  config.expect = expected[methodName]

  test(config.label, async t => {
    let {
      createComparer,
      request,
      execute
    } = config

    let compare = createComparer(t, config)

    prepareStub($stubs, config)
    let result = await execute(config)
    compare(t, result)
  })
  return testCase
}

module.exports = {
  generateTest,
  createComparer,
  prepareStub
}
