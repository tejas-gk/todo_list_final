const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:false,
    },
    description:{
        type:String,
        required:false,
    },
    reminder:{
        type:String,
        required:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"UserData",
    }

},{timestamps:true});
//creating new mongoose schema
module.exports=new mongoose.model("Tasks",taskSchema);
//exporting taskSchema
// module.exports={taskSchema};