import {
  createConcat,
  createMethodConcat
} from './_base'

const addon = {
  name: 'my-addon'
}
const concat = createMethodConcat()

module.exports = {
  apiName: 'teams',
  methods: {
    'remove': concat(),
    'update': concat(addon),

  },
  fluids: [
    'forProject'
  ]
}
