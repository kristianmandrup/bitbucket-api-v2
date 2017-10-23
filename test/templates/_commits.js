import {
  method
} from './_base'

module.exports = {
  apiName: 'commits',
  methods: {
    'getAll': method
  },
  fluids: [
    'forProject',
    'forProjectNode',
    'forComment'
  ]
}
