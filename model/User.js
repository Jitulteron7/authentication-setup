const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    scholerId:{
        type:Number,
        required:true,
        unique:true
    }
});

// encrypting password before saveing in mongoDB
UserSchema.pre("save",function(next){
    const user=this;
    if(!user.isModified("password")){
        return next();
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if(err){
                return next(err);
            }
            user.password=hash;
            next();
        })
    })
});

// comparing function to compare password
UserSchema.methods.comparePassword=function(passwordGiven){        const user=this;
        return new Promise((resolve,reject)=>{
            bcrypt.compare(passwordGiven,user.password,(err,isMatch)=>{
                if(err){
                    return reject(err);
                }
                if(!isMatch){
                    return reject(err);
                }
                resolve(true);
            });
        })
} 
module.exports=mongoose.model("User",UserSchema);