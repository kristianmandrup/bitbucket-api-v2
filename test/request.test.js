import test from 'ava'
import request from 'supertest'
import Request from '../src/hook-events'

test('Request: create', t => {
  t.truthy(Request)
})

// more tests ...
