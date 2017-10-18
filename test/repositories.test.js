import test from 'ava'
import request from 'supertest'
import {
  Repositories
} from '../src/repositories'
import prepareApi from './prepare-api'

let api
test.before(t => {
  api = prepareApi()
})

test('Repositories: create', t => {
  t.truthy(Repositories)

  // request
  //   .get('/hello')
  //   .expect(200)
})

// more tests ...
