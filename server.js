require('dotenv').config()
const express = require('express')
const app = express()
const { port, requestLatencyInMs } = process.env

app.get('/processJob', (req, res) => {
  console.log('received request. starting to process...')
  setTimeout(() => {
    res.send('ok')
  }, requestLatencyInMs)
})

app.listen(port, () => {
  console.log('running on port %s', port)
})