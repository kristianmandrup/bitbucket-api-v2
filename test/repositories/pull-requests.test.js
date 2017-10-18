import test from 'ava'
import PullRequests from '../../src/repositories/pull-requests'

test('PullRequests: create', t => {
  t.truthy(PullRequests)
})

// more tests ...
