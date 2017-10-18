import test from 'ava'
import request from 'supertest'
import {
  Repositories
} from '../src/repositories'

test('Repositories: create', t => {
  t.truthy(Repositories)

  // request
  //   .get('/hello')
  //   .expect(200)
})

// more tests ...
