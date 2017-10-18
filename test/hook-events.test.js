import {
  test,
  HookEvents
} from './imports'
import {
  prepareTest
} from './prepare'

const {
  $get,
  $post,
  user,
  repo
} = prepareTest()

test('HookEvents: create', t => {
  t.truthy(HookEvents)
})

// more tests ...
