const express = require('express')
const apicache = require("apicache");

const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//configure apicache 
let cache = apicache.middleware
  
//caching all routes for 5 minutes
app.use(cache('15 minutes'))
let routes = require('./routes') //importing rout
routes(app)
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})
app.listen(8989)
