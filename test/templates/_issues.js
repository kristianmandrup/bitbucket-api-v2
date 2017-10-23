import {
  method,
  prjConcat,
  createConcat,
} from './_base'

const issueId = '123'
const path = 'abc/123'
const commentId = 'c789'
const file = 'hello world'
const attachment = {
  file
}

const issueMethod = {
  args: prjConcat(issueId)
}
const attachmentMethod = {
  args: prjConcat(issueId, path)
}
const commentMethod = {
  args: prjConcat(issueId, commentId)
}

module.exports = {
  apiName: 'issues',
  methods: {
    'getAll': method,
    'create': issueMethod,
    'get': issueMethod,
    'remove': issueMethod,
    'getAttachments': issueMethod,
    'getAttachment': attachmentMethod,
    'uploadAttachments': {
      args: prjConcat(issueId, attachment)
    },
    'getComments': issueMethod,
    'getComment': commentMethod,
    'hasVoted': issueMethod,
    'vote': issueMethod,
    'retractVote': issueMethod,
    'isWatched': issueMethod,
    'watch': issueMethod,
    'stopWatch': issueMethod
  },
  fluids: [
    'forProject'
  ]
}
