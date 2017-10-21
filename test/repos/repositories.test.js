import {
  prepareApiTests
} from '../helpers'

const {
  $api,
  generator
} = prepareApiTests(test, 'repositories')

generator.generate('get')
generator.generateAll()
