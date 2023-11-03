const taskModel=require("../Models/taskModel");
const UserModel=require("../Models/userModel");

//new task handler
let createTask=async(req,res)=>{//post packet end up here
    try{
        let data=req.body;
        let registerTask=await taskModel.create(data);//wait for and return database data register
        return res.status(201).send({status:true,msg:"Task data registered successfully",data:registerTask});

    }catch(error){
        return res.status(500).send({status:false,msg:"Internal Server Error"});
    }
};


//task update handler
let updateTask = async function (req, res) {
    try {
        //retrieving data from request
        const { TaskName, Reminder } = req.body;

        console.log(TaskName);
        console.log(Reminder);
       
        //check if missing 
        if (!TaskName || !Reminder) {
            return res.status(400).send({ status: false, msg: 'Missing TaskName or Reminder field' });
        }
        //updating into database
        const taskUpdated = await taskModel.updateMany(
            { TaskName: TaskName },
            { $set: { Reminder: Reminder } }, // Use $set to update the Reminder field
            { new: true }
        );
         console.log(taskUpdated);
        if (!taskUpdated) {
            return res.status(404).send({ status: false, msg: "Task not found or could not be updated" });
        }
        //if taskupdated 
        return res.status(200).send({ status: true, msg: taskUpdated });
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: "Internal Server Error" });
    }
}


//exporting modules
 module.exports={createTask,updateTask};
