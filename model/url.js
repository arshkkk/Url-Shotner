var mongoose = require('mongoose')
var shortid = require('shortid')
var Schema = mongoose.Schema

var Url = new Schema({
    originalUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true,
        default:shortid.generate
    }

},{timestamps:true})

module.exports= mongoose.model('Url',Url)