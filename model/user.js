var mongoose = require('mongoose')
var Schema = mongoose.Schema

var User = new Schema({
   user:{
       type:String,
       default:'user',
   }
},{timestamps:true})

module.exports= mongoose.model('User',User)