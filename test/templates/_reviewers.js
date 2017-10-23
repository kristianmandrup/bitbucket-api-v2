import {
  method,
  user,
  projConcat,
  projMethod
} from './_base'

const reviewerMeth = projMethod(user)
const reviewer = {
  type: 'admin'
}

module.exports = {
  apiName: 'reviewers',
  methods: {
    'getAll': method,
    'get': reviewerMeth,
    'addReviewer': {
      request: {
        verb: 'put'
      },
      args: projConcat(user, reviewer)
    },
    'removeReviewer': reviewerMeth
  },
  fluids: [
    'forProject'
  ]
}
