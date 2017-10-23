import {
  method,
  prjConcat
} from './_base'

const file = 'hello world'

module.exports = {
  apiName: 'components',
  methods: {
    'getAll': method,
    'upload': {
      args: prjConcat(file)
    }
  },
  fluids: [
    'forProject',
    'forProjectNode',
    'forComment'
  ]
}
