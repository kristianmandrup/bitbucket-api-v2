import test from 'ava'

import {
  utils
} from '../../src'

const validate = utils.createArgValidator('getAll')

test('argValidator', t => {
  t.throws(x => {
    validate(undefined)
  }, TypeError)
})
