const mongoose=require("mongoose");
const taskModel=require("./taskModel");

const userScheme=new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        Unique:true,
    },
    Password:{
        type:String,
        required:true,
    },
},{timestamps:true});

module.exports=new mongoose.model("UserData",userScheme);


