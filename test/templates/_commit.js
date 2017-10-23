import {
  concat,
  projConcat,
  createConcat,
  args,
  method
} from './_base'

const commitMethod = {
  args: projConcat('123')
}

module.exports = {
  apiName: 'commit',
  methods: {
    'approve': commitMethod,
    disApprove: commitMethod,
    getBuildStatuses: commitMethod,
    createBuild: commitMethod,
    getBuildStatus: {
      args: projConcat('123', 'key:678')
    },
    getComments: {
      args: projConcat('sha:123')
    },
    getComment: {
      args: projConcat('sha:123', '456')
    }
  },
  fluids: [
    'forProject'
  ]
}
