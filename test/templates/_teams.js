import {
  createMethodConcat,
  user
} from './_base'

const role = 'admin'
const owner = 'kris'
const project = {
  name: 'my-project'
}
const projectId = '124'

const concat = createMethodConcat()
const projConcat = createMethodConcat(owner)
const projIdConcat = createMethodConcat(owner, projectId)

module.exports = {
  apiName: 'teams',
  methods: {
    'get': concat(role),
    'getProjects': concat(owner),
    'addProject': projConcat(project),
    'getProject': projIdConcat(),
    'updateProject': projIdConcat(project),
    'removeProject': projIdConcat(),
    'getUserInfo': concat(user)
  },
  fluids: [
    'forProject'
  ]
}
