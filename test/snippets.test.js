import test from 'ava'
import request from 'supertest'
import Snippets from '../src/hook-events'

test('Snippets: create', t => {
  t.truthy(Snippets)
})

// more tests ...
