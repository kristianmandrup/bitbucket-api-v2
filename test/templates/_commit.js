import {
  concat,
  args,
  method
} from './_base'

module.exports = {
  apiName: 'commit',
  methods: {
    'approve': {
      args: concat('123')
    }
  }
}
