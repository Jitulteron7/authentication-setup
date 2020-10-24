const express=require("express");
const router=express.Router();
const jwt=require("jsonwebtoken");
const User =require("../model/User");
const LoginUser=require("../cutom-middleware/jwtLogin");
router.get("/sign-in",(req,res)=>{
    const {email,password}=req.body;
});
const {jwt_secret}=require("../keys/key");
router.post("/sign-up",async (req,res)=>{
    const {email,password,name,scholerId}=req.body;
    if(!email||!password||!name||!scholerId){
         res.send("<p>please enter all the requried fields</p>");
    }
    else{
        const account=await User.findOne({email})
        if(account){
            return res.send("<p>account already exits</p>");
        }
        try{
            const user=new User({
                name,email,password,scholerId
            });
            await user.save();
            res.send("<p>sign up sucessfully</p>");

            // nodemail to send mail for sign up succesfully 
            /*

             */

        }
        catch(err){
            return res.json("error",err);
        }
    }
    
});

router.post("/sign-in",async (req,res)=>{
    const {email,password,scholerId}=req.body;
    if(!email||!password||!scholerId){
        return res.send("<p>please enter all the required fields</p> ")
    }
     const user=await User.findOne({email});
     if(!user){
         return res.status(422).send("<p>sign up first</p>");
     }
     try{
        user.comparePassword(password);
        // if true then token is send 
        // if false send error {err} 
        const token=jwt.sign({userId:user._id},jwt_secret)
        res.send({token});
     }
     catch(err){
            res.status(422).send("<p>error</p>",err);
     }
})

router.get("/",LoginUser,(req,res)=>{
    res.send("hello bro");
})
router.get("/profile",LoginUser,(req,res)=>{
    res.send("your profile");
})
// just for testing purpose
router.get("/credits",(req,res)=>{
    res.send("here are your credits");
})

// router.post("forgot-password",(req,res));
module.exports=router;
