import {
  method,
  projMethod
} from './_base'

const prId = '678'
const commentId = 'xyz123'
const pr = {
  name: 'my-pull'
}

const prMeth = projMethod(prId)
const commentMeth = projMethod(prId, commentId)

module.exports = {
  apiName: 'pullRequests',
  methods: {
    'getAll': method,
    'create': projMethod(pr),
    'allActivity': method,
    'getActivity': prMeth,
    'approve': prMeth,
    'disApprove': prMeth,
    'getComments': prMeth,
    'getComment': commentMeth,
    'getCommits': prMeth,
    'decline': prMeth,
    'getDiff': prMeth,
    'merge': prMeth,
    'patch': prMeth,
    'statuses': prMeth
  },
  fluids: [
    'forProject',
    'forPR'
  ]
}
