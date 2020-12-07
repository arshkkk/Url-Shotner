var express = require('express')
var app = express()
var urlController = require('../controller/urlController')
const auth = require('../auth')

//gives dashboard.html to client
app.get('/dashboard',auth, urlController.dashboard)

//creates and saves short urls to database
app.post('/createShort',auth, urlController.createShort)

// //increment clicks of url by 1 of id-> :id
// app.put('/increment/:id', urlController.incrementClick)

//Fetches all links in database in json form
app.get('/all',auth, urlController.allLinks)

//Redirecting shorturls 
app.get('/:shortUrl', urlController.redirectShortUrl)

//Deleting Urls
app.get('/delete/:id', urlController.deleteUrl)

module.exports = app