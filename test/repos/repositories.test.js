import {
  createTestsGenerator
} from '../helpers'

createTestsGenerator({
  name: 'repositories',
  logging: true
}).generate([
  // 'create',
  // 'createPullRequest',
  // 'get',
  // 'commit',
  // 'getBranches',
  // 'getCommit',
  // 'getByUser',
  // 'getByTeam',
  // 'getForks',
  'getForksFromResponse',
  // 'getParentFromResponse'
])
