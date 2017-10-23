import {
  createConcat,
  createMethodConcat
} from './_base'

const subjectType = 'push'
const concat = createMethodConcat()

module.exports = {
  apiName: 'hookEvents',
  methods: {
    'get': concat(),
    'forSubject': concat(subjectType)
  },
  fluids: [
    'forProject'
  ]
}
