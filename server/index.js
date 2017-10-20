const express = require('express')
const app = express()
const port = 3000

const {
  log,
  error
} = console

// handle bitbucket authentication callback for 3-LO OAuth2 flow
app.get('/authenticated', (request, response) => {
  log('get', request)
  response.end('get: authenticated ok :)')
})

app.post('/authenticated', (request, response) => {
  log('post', request)
  response.end('post: authenticated ok :)')
})

app.listen(port, err => {
  if (err) {
    return error('something bad happened', err)
  }
  log(`server is listening on ${port}`)
})
