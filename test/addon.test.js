import {
  test,
  log,
  error,
  defaults,
  prepareTest,
  addon
} from './helpers'

const api = addon.createApi()

test('Addon: new', t => {
  t.truthy(Addon)
  t.truthy(api.addon)
})

test('Addon: remove(callback)', async t => {
  prepareTest({
    delete: '/addon'
  })
  let result = await api()
  log({
    result
  })
  t.is(result.code, 200)
})

test('Addon: update(addon, callback)', async t => {
  t.fail('todo')
})
