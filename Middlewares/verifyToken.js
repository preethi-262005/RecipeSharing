const jwt=require('jsonwebtoken');
require('dotenv').config()

 const verifyToken=(req,res,next)=>{
    //get bearer token
    let bearerToken=req.headers.authorization;
    //console.log("bearer token",bearerToken)
    if(!bearerToken){
        return res.send({message:"Unauthorized access..plz login "})
    }
    let token=bearerToken.split(' ')[1];
    try{
    let decodedToken=jwt.verify(token,process.env.SECRET_KEY)
    next()
    }catch(err){
        next(err)
    }
}

module.exports=verifyToken