import {
  singleRepo,
  concat,
  createConcat,
  projConcat,
  user,
  repo,
  args,
  method
} from './_base'

const kind = 'push'
const restrictionId = '123'

const restrArgs = projConcat(restrictionId)
const restriction = {
  args: restrArgs
}
restriction.concat = createConcat(restrArgs)

restriction.method = {
  args: restriction.args
}


module.exports = {
  apiName: 'repositories',
  methods: {
    'get': method,
    'create': {
      args: projConcat(kind)
    },
    'getRestriction': restriction.method,
    'updateRestriction': {
      args: restriction.concat({
        type: 'restriction'
      })
    },
    'removeRestriction': restriction.method
  },
  fluids: [
    'forProject',
    'forRestriction'
  ]
}
