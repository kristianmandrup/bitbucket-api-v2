import {
  user,
  method,
  noArgs,
  createConcat,
  createMethodConcat
} from './_base'

const snippet = {
  name: 'my-snippet'
}
const files = {
  'Readme.md': 'hello world'
}
const data = {
  files,
  author: 'unknown@gmail.com'
}
const comment = {
  msg: 'hello'
}
const snippetId = '456'

const concat = createMethodConcat()
const userConcat = createMethodConcat(user)
const snippetConcat = createMethodConcat(user, snippetId)
const snippetMeth = userConcat(snippetId)
const commentMeth = userConcat(snippetId, comment)

module.exports = {
  apiName: 'snippets',
  methods: {
    'get': noArgs,
    'create': concat(files),
    'createWithMeta': concat(data),
    'getFor': userConcat(),
    'createSnippetFor': userConcat(snippet),
    'getSnippetFor': snippetMeth,
    'updateSnippetFor': snippetConcat(snippet),
    'removeSnippetFor': snippetMeth,
    'getSnippetCommentsFor': snippetMeth,
    'addSnippetCommentFor': userConcat(snippetId, comment),
    'isSnippetWatchedFor': snippetMeth,
    'watchSnippetFor': snippetMeth,
    'stopWatchingSnippetFor': snippetMeth,
    'getSnippetWatchersFor': snippetMeth
  },
  fluids: [
    'forProject'
  ]
}
