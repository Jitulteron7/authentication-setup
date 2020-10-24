const jwt =require("jsonwebtoken");
const {jwt_secret}=require("../keys/key")
const User=require("../model/User");

module.exports=(req,res,next)=>{

    const {authorization}=req.headers;
    if(!authorization){
        return res.status(401).send("Sign in first");
    }
    const token=authorization.replace("Bearer ","");
    jwt.verify(token,jwt_secret,async(err,payload)=>{
        if(err){
            return res.status(401).send({error:"Sign in first"});
        }
        const {userId}=payload;
       const user= User.findById({userId});
       req.user=user;
       next();
    });
}