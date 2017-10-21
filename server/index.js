const express = require('express')
const app = express()
const port = 3000

const {
  log,
  error
} = console

// handle bitbucket authentication callback
app.get('/authenticated', (request, response) => {
  log('get', request)
  response.end('authenticated ok :)')
})

app.listen(port, err => {
  if (err) {
    return error('something bad happened', err)
  }
  log(`server is listening on ${port}`)
})
