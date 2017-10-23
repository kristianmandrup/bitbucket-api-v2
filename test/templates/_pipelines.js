import {
  method,
  projMethod
} from './_base'

const pipelineId = '678'
const stepId = 'xyz123'

const pipeMeth = projMethod(pipelineId)
const stepMeth = projMethod(pipelineId, stepId)

module.exports = {
  apiName: 'pipelines',
  methods: {
    'getAll': method,
    'create': method,
    'get': pipeMeth,
    'stop': pipeMeth,
    'getSteps': pipeMeth,
    'getStep': stepMeth,
    'getStepLog': stepMeth,
  },
  fluids: [
    'forProject',
    'forPipeline',
    'forPipelineStep'
  ]
}
