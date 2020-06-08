var express = require('express')
var app = express()
var urlController = require('../controller/urlController')

//gives dashboard.html to client
app.get('/dashboard',urlController.dashboard)

//creates and saves short urls to database
app.post('/createShort',urlController.createShort)

//increment clicks of url by 1 of id-> :id
app.put('/increment/:id', urlController.incrementClick)

//Fetches all links in database in json form
app.get('/all',urlController.allLinks)

//Redirecting shorturls 
app.get('/:shortUrl', urlController.redirectShortUrl)

module.exports = app