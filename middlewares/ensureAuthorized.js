var jwt=require("jsonwebtoken");
module.exports=function(req,res,next){
  var bearerHeader = req.headers["authorization"];
    
    if(typeof bearerHeader!== 'undefined'){
       
        var bearerToken = bearerHeader.split(" ")[1];
         
      //req.token=bearerToken;
        jwt.verify(bearerToken,process.env.SECRET, function(err,decoded){
           if(err) {
               return res.status(403).send("Invalid Token"); 
           }
            req.decoded = decoded;
            next();
        });
            
      
    }
    else{
        // not authorized
        console.log("not authorized..no token was sent");
        return res.status(403).send({
          success: false,
            message:"No token was sent"
        });
    }
   
}