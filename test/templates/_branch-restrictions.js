import {
  singleRepo,
  concat,
  user,
  repo,
  args,
  method
} from './_base'

module.exports = {
  apiName: 'repositories',
  methods: {
    'get': method,
    'create': method,
    'getRestriction': method,
    'updateRestriction': method,
    'removeRestriction': method
  }
}
