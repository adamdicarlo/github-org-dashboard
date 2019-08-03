(function () {
  const result = require('dotenv').config()
  if (result.error) {
    throw result.error
  }
})()

const express = require('express')
const app = express()

const port = process.env.PORT

app.get('/orgs/:org', (req, res) => {
  const { org } = req.params

  res.send({ org })
})

app.listen(port, err => {
  if (err) {
    throw err
  }
  console.log(`Listening on port ${port}`)
})
