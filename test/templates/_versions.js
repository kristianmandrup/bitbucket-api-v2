import {
  method,
  projMethod
} from './_base'

const versionId = '27'
const versionMeth = projMethod(versionId)

module.exports = {
  apiName: 'versions',
  methods: {
    'getAll': method,
    'get': versionMeth
  },
  fluids: [
    'forProject'
  ]
}
