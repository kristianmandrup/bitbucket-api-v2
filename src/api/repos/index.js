const dasherize = require('underscore.string/dasherize')

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
]

const templates = apis.reduce((acc, name) => {
  const template = dasherize(name)
  acc[name] = require(`./${template}`)
  return acc
}, {})

module.exports = templates
