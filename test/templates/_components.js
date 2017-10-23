import {
  method
} from './_base'

module.exports = {
  apiName: 'components',
  methods: {
    'getAll': method
  },
  fluids: [
    'forProject',
    'forProjectNode',
    'forComment'
  ]
}
