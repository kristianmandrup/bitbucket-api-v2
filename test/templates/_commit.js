import {
  concat,
  prjConcat,
  createConcat,
  args,
  method
} from './_base'

const commitMethod = {
  args: prjConcat('123')
}

module.exports = {
  apiName: 'commit',
  methods: {
    'approve': commitMethod,
    disApprove: commitMethod,
    getBuildStatuses: commitMethod,
    createBuild: commitMethod,
    getBuildStatus: {
      args: prjConcat('123', 'key:678')
    },
    getComments: {
      args: prjConcat('sha:123')
    },
    getComment: {
      args: prjConcat('sha:123', '456')
    }
  },
  fluids: [
    'forProject'
  ]
}
