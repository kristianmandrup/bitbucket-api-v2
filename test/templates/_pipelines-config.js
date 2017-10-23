import {
  method,
  projMethod
} from './_base'

const buildNumber = 1
const schedule = {
  type: 'schedule'
}
const scheduleId = '678'
const config = {
  name: 'blip'
}

const scheduleMeth = projMethod(scheduleId)

module.exports = {
  apiName: 'pipelinesConfig',
  methods: {
    'get': method,
    'update': projMethod(config),
    'nextBuildNumber': projMethod(buildNumber),
    'getSchedules': method,
    'createSchedule': projMethod(schedule),
    'getSchedule': scheduleMeth,
    'getScheduleExecutions': scheduleMeth,
    'updateSchedule': scheduleMeth,
    'deleteSchedule': scheduleMeth
  },
  fluids: [
    'forProject'
  ]
}
