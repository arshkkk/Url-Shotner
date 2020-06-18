var Url = require('../model/url')
var axios = require('axios')
var config = require('../config')

exports.createShort = (req,res,next)=>{
    if(req.body.originalUrl.includes('https://'))
    req.body.originalUrl=req.body.originalUrl.replace('https://','')
    if(req.body.originalUrl.includes('http://'))
    req.body.originalUrl=req.body.originalUrl.replace('http://','')
    console.log(req.body)
    Url.create({
        originalUrl:req.body.originalUrl
    },(err,url)=>{
        if(err) return res.json(500,{result:err, message:'Internal Server Error', success:false})
        if(!url) return res.json(500,{result:null, message:'Internal Server Error', success:false})
       
        res.redirect('/')
        // res.json(202,{result:url,message:"Url Successfully Saved",success:true})
    })

}

exports.incrementClick = (req,res,next)=>{
    Url.findByIdAndUpdate(req.params.id,{$inc:{clicks:1}},(err,url)=>{
        if(err) return res.json(500,{result:err, message:'Internal Server Error', success:false})
        res.json({res:url})
    })
}

exports.dashboard = (req,res,next)=>{
    
    Url.find({},(err,urls)=>{
        if(err) return res.json(500,{result:err, message:'Internal Server Error', success:false})
        res.render('dashboard',{layout:false,url:urls })
    })

}

exports.allLinks = (req,res,next)=>{
    Url.find({},(err,urls)=>{
        if(err) return res.json(500,{result:err, message:'Internal Server Error', success:false})
        res.json({res:urls})
    })
}

exports.redirectShortUrl = (req,res,next)=>{
    
    Url.findOne({shortUrl:req.params.shortUrl},(err,url)=>{
        if(err) return res.json(500,{result:err, message:'Internal Server Error', success:false})
        if(!url) return res.json(400,{result:null, message:'Url Not Valid or Expired', success:false})
        console.log(url.originalUrl)
        axios({
            url:`${config.host}/increment/${url._id}`,
            method: 'PUT',
            responseType:'json',
          }).then(result=>{

                res.redirect(`http://${result.data.res.originalUrl}`)
          })
          .catch(err=>{
              if(err) console.log(err)

          })
    })
}