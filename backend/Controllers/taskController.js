const Tasks = require("../Models/taskModel");
const UserData = require("../Models/userModel");
//new task handler
let createTask = async (req, res) => {
  let data = req.body;
  console.log(data);
  try {
    const task = await Tasks.create({
      title: data.TaskName,
      user: data.id,
      description: data.Description,
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

const task = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Tasks.find({
      user: id
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

const allTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}



//task update handler
let updateTask = async function (req, res) {
  try {
    //retrieving data from request
    const {
      TaskName,
      Reminder
    } = req.body;

    console.log(TaskName);
    console.log(Reminder);

    //check if missing 
    if (!TaskName || !Reminder) {
      return res.status(400).send({
        status: false,
        msg: 'Missing TaskName or Reminder field'
      });
    }
    //updating into database
    const taskUpdated = await taskModel.updateMany({
        TaskName: TaskName
      }, {
        $set: {
          Reminder: Reminder
        }
      }, // Use $set to update the Reminder field
      {
        new: true
      }
    );
    console.log(taskUpdated);
    if (!taskUpdated) {
      return res.status(404).send({
        status: false,
        msg: "Task not found or could not be updated"
      });
    }
    //if taskupdated 
    return res.status(200).send({
      status: true,
      msg: taskUpdated
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: false,
      msg: "Internal Server Error"
    });
  }
}




//exporting modules
module.exports = {
  createTask,
  updateTask,
  allTasks,
  task
};