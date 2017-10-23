import {
  createTestsGenerator
} from '../helpers'

createTestsGenerator({
  name: 'branchRestrictions',
  logging: true
}).generate([
  'get',
  'create',
  'getRestriction',
  'updateRestriction',
  'removeRestriction'
])
