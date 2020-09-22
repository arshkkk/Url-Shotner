var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var app = express();

//config
var config = require('./config')

//Setting Up mongodb using mongoose
mongoose.connect(config.mongoUrl,
  { 
    useNewUrlParser:true,
    useUnifiedTopology:true
  },
  (err)=>{
  if(err) return console.log(err)
  console.log('Mongodb Connected')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname,'public')))
app.get('/platform',(req,res,next)=>{
  res.json({platform: process.platform})
})
app.use('/',require('./routes/url'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
