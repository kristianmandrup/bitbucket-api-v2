import {
  createTestsGenerator
} from '../helpers'

createTestsGenerator({
  name: 'repositories',
  logging: true
}).generate([
  'get',
  // 'create'
])
