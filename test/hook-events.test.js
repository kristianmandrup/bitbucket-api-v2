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

test('HookEvents: new', async t => {
  t.truthy(HookEvents)
})

test('HookEvents: get(callback)', async t => {
  t.fail('todo')
})

test('HookEvents: forSubject(subjectType, callback)', async t => {
  t.fail('todo')
})
