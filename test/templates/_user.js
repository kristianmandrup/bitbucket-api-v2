import {
  noArgs,
  createMethodConcat
} from './_base'

const email = 'kris@gmail.com'
const concat = createMethodConcat()

module.exports = {
  apiName: 'user',
  methods: {
    'get': noArgs,
    'getEmails': noArgs,
    'getEmailDetails': concat(email)
  },
  fluids: [
    'forProject'
  ]
}
