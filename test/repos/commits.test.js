import {
  createTestsGenerator
} from '../helpers'

createTestsGenerator({
  name: 'commits',
  logging: true
}).generate([
  'getAll'
])
