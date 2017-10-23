import {
  createConcat,
  createMethodConcat
} from './_base'

const addon = {
  name: 'my-addon'
}
const concat = createMethodConcat()

module.exports = {
  apiName: 'addon',
  methods: {
    'remove': concat(),
    'update': concat(addon),

  },
  fluids: [
    'forProject'
  ]
}
