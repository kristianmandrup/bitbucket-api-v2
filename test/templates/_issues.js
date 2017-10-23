import {
  method,
  projConcat,
  projMethod,
  createConcat,
} from './_base'

const issueId = '123'
const path = 'abc/123'
const commentId = 'c789'
const file = 'hello world'
const attachment = {
  file
}

const issueMethod = projMethod(issueId)

module.exports = {
  apiName: 'issues',
  methods: {
    'getAll': method,
    'create': issueMethod,
    'get': issueMethod,
    'remove': issueMethod,
    'getAttachments': issueMethod,
    'getAttachment': projMethod(issueId, path),
    'uploadAttachments': projMethod(issueId, attachment),
    'getComments': issueMethod,
    'getComment': projMethod(issueId, commentId),
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
