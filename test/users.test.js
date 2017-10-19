import test from 'ava'
import Users from '../src/user'

test('Users: create', t => {
  t.truthy(Users)
})

test('Users: get(username, callback)', t => {
  t.fail('todo')
})

test('Users: getFollowers(username, callback)', t => {
  t.fail('todo')
})

test('Users: getFollowing(username, callback)', t => {
  t.fail('todo')
})

test('Users: getWebHooks(username, callback)', t => {
  t.fail('todo')
})

test('Users: getWebHook(username, hookId, callback)', t => {
  t.fail('todo')
})

test('Users: removeWebHook(username, hookId, callback)', t => {
  t.fail('todo')
})

test('Users: updateWebHook(username, hookId, hook, callback)', t => {
  t.fail('todo')
})

test('Users: getPipelineConfigVars(username, hookId, callback)', t => {
  t.fail('todo')
})

test('Users: getPipelineConfigVar(username, variable_uuid, callback)', t => {
  t.fail('todo')
})

test('Users: removePipelineConfigVar(username, variable_uuid, callback)', t => {
  t.fail('todo')
})

test('Users: updatePipelineConfigVar(username, variable_uuid, variable, callback)', t => {
  t.fail('todo')
})

test('Users: getRepositories(username, callback)', t => {
  t.fail('todo')
})

test('Users: forUser(username)', t => {
  t.fail('todo')
})
