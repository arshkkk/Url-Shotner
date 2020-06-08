var express = require('express')
var app = express()
var Url = require('../model/url')


app.post('/createShort',(req,res,next)=>{
    Url.create({
        originalUrl:req.body.originalUrl
    },(err,url)=>{
        if(err) return res.json(500,{result:err, message:'Internal Server Error', success:false})
        if(!url) return res.json(500,{result:null, message:'Internal Server Error', success:false})
       
        res.redirect('/')
        // res.json(202,{result:url,message:"Url Successfully Saved",success:true})
    })

})

// app.get('/createShort',(req,res,next)=>{

// })

app.get('/dashboard',(req,res,next)=>{
    Url.find({},(err,urls)=>{
        if(err) return res.json(500,{result:err, message:'Internal Server Error', success:false})
        res.render('dashboard',{layout:false,url:urls })
    })
})


app.get('/all',(req,res,next)=>{
    Url.find({},(err,urls)=>{
        if(err) return res.json(500,{result:err, message:'Internal Server Error', success:false})
        res.json({res:urls})
    })
})
app.get('/:shortUrl',(req,res,next)=>{
    
    Url.findOne({shortUrl:req.params.shortUrl},(err,url)=>{
        if(err) return res.json(500,{result:err, message:'Internal Server Error', success:false})
        if(!url) return res.json(400,{result:null, message:'Url Not Valid or Expired', success:false})
        console.log(url.originalUrl)
        res.redirect('http://'+url.originalUrl)
    })
})

module.exports = app