import {
  singleRepo,
  concat,
  createConcat,
  prjConcat,
  user,
  repo,
  args,
  method
} from './_base'

const kind = 'push'
const restrictionId = '123'

const restrArgs = prjConcat(restrictionId)
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
      args: prjConcat(kind)
    },
    'getRestriction': restriction.method,
    'updateRestriction': {
      args: restriction.concat({
        type: 'restriction'
      })
    },
    'removeRestriction': restriction.method
  }
}
