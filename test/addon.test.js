import {
  test,
  Addon
} from './imports'
import {
  prepareTest
} from './prepare'

const {
  $get,
  $post,
  user,
  repo
} = prepareTest(test, addon, ['get'])

test('Addon: new', t => {
  t.truthy(Addon)
})

test('HookEvents: remove(callback)', async t => {
  t.fail('todo')
})

test('HookEvents: update(addon, callback)', async t => {
  t.fail('todo')
})
