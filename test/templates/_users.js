import {
  createMethodConcat,
  concat,
  user,
  method
} from './_base'

const pipelineId = '124'
const hookId = 'hook:267'
const varId = 'var:890'
const hook = {
  type: 'hook'
}
const value = {
  x: 2
}

const userConcat = createMethodConcat(user)
const pipelineConfigConcat = createMethodConcat(pipelineId)

const userMeth = userConcat()
const hookMeth = userConcat(hookId)

module.exports = {
  apiName: 'users',
  methods: {
    'get': userMeth,
    'getFollowers': userMeth,
    'getFollowing': userMeth,
    'getWebHooks': userMeth,
    'getWebHook': hookMeth,
    'removeWebHook': hookMeth,
    'updateWebHook': userConcat(hookId, hook),
    'getPipelineConfigVars': userMeth,
    'getPipelineConfigVar': userConcat(varId),
    'removePipelineConfigVar': userConcat(varId),
    'updatePipelineConfigVar': userConcat(varId, value),
    'getRepositories': userMeth
  },
  fluids: [
    'forProject'
  ]
}
