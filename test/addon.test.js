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
} = prepareTest()

test('Addon: create', t => {
  t.truthy(Addon)
})

// more tests ...
