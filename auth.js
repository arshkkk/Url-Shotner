const User = require('./model/user')

module.exports = (req,res,next)=>{

    console.log(req.cookies)

    if(req.cookies._id){
       console.log('cookies present')
        req.user = {_id : req.cookies._id}
        next()

    }
    else {
        console.log('no cookies')
        User.create({})
            .then(user=>{ req.user = {_id:user._id}; res.cookie('_id', user._id,{expires: new Date(253402300000000)} ); next();})
        
  
    }
  
}