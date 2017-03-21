var express=require('express');
var UserModel =require("../model/UserModel");
var BuddyModel=require('../model/BuddiesModel');
var jwt= require("jsonwebtoken");
var ensureAuthorized = require('../middlewares/ensureAuthorized');

var router=express.Router();
router.post('/authenticate', function(req,res){
    UserModel.findOne({username:req.body.username},function(err,data){
        if(err) res.json({success:false,message:"Error occured while trying to validate the user details from Database"});
        if(!data) {res.json({success:false, message:"Such a user does not exist in the Database"});}
        if(data){
            //validate if password is correct
            if(data.password=== req.body.password){
                //create jwt token
                var token = jwt.sign(data,process.env.SECRET);
               
                res.json({token:token,success:true, message:'Validation successful'});
            }
            else{
                console.log("incorrect password");
                res.json({success:false, message:"Incorrect :Password"});
            }
        }
    });
});


router.post('/signup', function(req,res){
    
    
   UserModel.findOne({username:req.body.username},function(err,data){
       if(err) {
           res.json({success:false, message:'Error occured at the Database'+err});
       }
       if(data){
           res.json({success:false,message:'Username already taken..Try with a different user name'});
       }
       else{
          var user = new UserModel();
           user.email=req.body.email;
           user.username=req.body.username;
           user.password=req.body.password;
           user.save(function(err,user1){
              
                if(err) res.json({success:false,message:"Error occured while trying to add the new user"});  
                 else res.json({success:true,message:"User has been added successfully"});
               
           });
       }
       
   });
});

router.get('/api/buddies', ensureAuthorized,function(req,res){
    BuddyModel.find({},function(err,buddiesdata){
        if (err) {
            console.log("error occured at server while trying to fetch contact records");
            res.send(err);
        }
        else{
            res.json(buddiesdata);
        }
        
    });
    
        
});



module.exports=router;