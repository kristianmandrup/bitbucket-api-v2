import {
  singleRepo,
  concat,
  user,
  repo,
  args,
  method
} from './_base'

const kind = 'push'
const restrictionId = '123'
const restriction = {
  args: concat(args.project, restrictionId)
}
restriction.method = {
  args: restriction.args
}

module.exports = {
  apiName: 'repositories',
  methods: {
    'get': method,
    'create': {
      args: concat(args.project, kind)
    },
    'getRestriction': restriction.method,
    'updateRestriction': {
      args: concat(restriction.args, {
        type: 'restriction'
      })
    },
    'removeRestriction': restriction.method
  }
}
