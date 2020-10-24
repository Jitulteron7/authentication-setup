const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const AuthRoute=require("./route/auth");
const {mongoDBUrl}=require("./keys/key")
const PORT=4000||process.env.PORT;
mongoose.connect(mongoDBUrl,{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.on("connected",()=>{
    console.log("connected to mongoDB");
})
mongoose.connection.on("error",(err)=>{
    console.log("error while connecting to mongoDB",err);
})
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(AuthRoute);
app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(`running on port ${PORT}`);
    }
})