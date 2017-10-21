import {
  createTestsGenerator
} from '../helpers'

let generator = createTestsGenerator({
  name: 'repositories',
  logging: true
})

generator.generate('get', 'create')
