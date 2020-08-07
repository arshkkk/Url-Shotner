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
    },
    clicks:{
        type:Number,
        required:true,
        default:0
    },
    user:{ type: mongoose.Schema.Types.ObjectId,
        ref:'User' 
    }
},{timestamps:true})

module.exports= mongoose.model('Url',Url)