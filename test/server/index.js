const express = require('express')
const app = express()
const port = 3000

// handle bitbucket authentication callback for 3-LO OAuth2 flow
app.get('/bitbucket/authentication', (request, response) => {
  console.log(request)
})

app.listen(port, err => {
  if (err) {
    return console.error('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
