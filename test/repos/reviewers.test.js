import {
  createTestsGenerator
} from '../helpers'

createTestsGenerator({
  name: 'reviewers',
  logging: true
}).generate('addReviewer')
