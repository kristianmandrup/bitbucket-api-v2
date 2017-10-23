const dasherize = require('underscore.string/dasherize')

const apis = [
  'repositories',
  'branchRestrictions',
  'commits',
  'commit',
  'downloads'
]

const templates = apis.reduce((acc, name) => {
  const template = dasherize(name)
  acc[name] = require(`./_${template}`)
  return acc
}, {})

export default templates
