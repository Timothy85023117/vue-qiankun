const express = require('express')
const app = require('express')()
const server = require('http').createServer(app)

server.listen(5001)
app.use(express.static('./dist'))
app.get('/', function (req, res) {
  res.sendfile('index.html')
})
