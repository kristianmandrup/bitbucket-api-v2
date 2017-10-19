// sample execute
export async function execute(config = {}) {
  let {
    methodName,
    api,
    args
  } = config
  let apiMethod = api[methodName]
  return await apiMethod(...args)
}

// sample compare function factory
export function createComparer(t, config = {}) {
  let {
    expect
  } = config
  return result => {
    t.is(result.x, expect.x)
  }
}

export default {
  execute,
  createComparer
}
