var express= require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var jwt        = require("jsonwebtoken");
var app=express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type, Authorization');
    next();
});
process.env.SECRET= 'sshhhhsssh';
mongoose.connect('mongodb://sashikodi:omsai28@ds151927.mlab.com:51927/whitebox');
var connection = mongoose.connection;
connection.on('error', function(){
   console.log('error occured while trying to connect to mongodb') ;
});
connection.once('open', function(){
   console.log('connection to mongodb has been established') ;
});
var router=require("./routes");
app.use('/', router);
app.listen(3000);
