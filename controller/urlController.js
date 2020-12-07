var Url = require('../model/url')
var config = require('../config')
var mongoose = require('mongoose')
var {isAlreadyVisited, markAsVisited} = require('../services/services')

exports.createShort = (req, res, next) => {
    if (req.body.originalUrl.includes('https://'))
        req.body.originalUrl = req.body.originalUrl.replace('https://', '')
    if (req.body.originalUrl.includes('http://'))
        req.body.originalUrl = req.body.originalUrl.replace('http://', '')
    console.log(req.body)
    Url.create({
        originalUrl: req.body.originalUrl,
        user: req.user._id
    }, (err, url) => {
        if (err) return res.json(500, {result: err, message: 'Internal Server Error', success: false})
        if (!url) return res.json(500, {result: null, message: 'Internal Server Error', success: false})

        res.json({success: true, shortUrl: url.shortUrl, originalUrl: url.originalUrl})
        // res.json(202,{result:url,message:"Url Successfully Saved",success:true})
    })

}

// exports.incrementClick = (req,res,next)=>{
// Url.findByIdAndUpdate(req.params.id,{$inc:{clicks:1}},(err,url)=>{
//     if(err) return res.json(500,{result:err, message:'Internal Server Error', success:false})
//     res.json({res:url})
// })
// }

exports.dashboard = (req, res, next) => {
    console.log(req.user._id)
    Url.find({user: mongoose.Types.ObjectId(req.user._id)}, (err, urls) => {
        if (err) return res.json(500, {result: err, message: 'Internal Server Error', success: false})

        //shortening the length of original url so that they can fit in table easily
        urls = urls.map(url => {
            url.originalUrl = url.originalUrl.substr(0, config.MAX_LENGTH_ORIGINAL_URL_IN_TABLE);
            url.originalUrl += '.....'
            return url;
        })
        res.render('dashboard', {layout: false, urls})
    })

}

exports.allLinks = (req, res, next) => {
    Url.find({_id: req.user._id}, (err, urls) => {
        if (err) return res.json(500, {result: err, message: 'Internal Server Error', success: false})
        res.json({res: urls})
    })
}

exports.redirectShortUrl = (req, res, next) => {

    Url.findOne({shortUrl: req.params.shortUrl}, (err, url) => {
        if (err) return res.json(500, {result: err, message: 'Internal Server Error', success: false})
        if (!url) return res.json(400, {result: null, message: 'Url Not Valid or Expired', success: false})

        if (!isAlreadyVisited(url._id, req, res)) {
            console.info("Not Already Visited");

            markAsVisited(url._id, req, res)

            Url.findByIdAndUpdate(url._id, {$inc: {clicks: 1}}, (err) => {
                if (err) return res.json(500, {result: err, message: 'Internal Server Error', success: false})
                res.redirect('http://' + url.originalUrl)
            })
        } else {
            console.info("Already Visited");
            res.redirect('http://' + url.originalUrl)
        }


    })
}

exports.deleteUrl = (req, res, next) => {
    Url.findByIdAndDelete(req.params.id, (err, url) => {
        if (err) res.json(500, {message: 'Something Wrrong Happened'})

        res.redirect('/dashboard')
    })
}