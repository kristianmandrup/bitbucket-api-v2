const {
  dasherize,
  camelize
} = require('underscore.string')

const apis = [
  'repositories',
  'branchRestrictions',
  'commits',
  'commit',
  'downloads',
  'forks',
  'hooks',
  'issues',
  'milestones',
  'pipelinesConfig',
  'pipelines',
  'pullRequests',
  'refs',
  'reviewers',
  'versions',
  'addon',
  'hookEvents',
  'snippets',
  'teams',
  'user',
  'users'
]

const templates = apis.reduce((acc, name) => {
  const template = dasherize(name)
  const label = camelize(name)
  acc[label] = require(`./_${template}`)
  return acc
}, {})

export default templates
