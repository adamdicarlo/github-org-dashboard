(function () {
  const result = require('dotenv').config()
  if (result.error) {
    throw result.error
  }
})()

const express = require('express')
const app = express()

const port = process.env.PORT

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.listen(port, (err) => {
  if (err) {
    throw err
  }
  console.log(`Listening on port ${port}`)
})
