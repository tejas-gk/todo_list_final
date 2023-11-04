import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Body.css';
import { addNewDivToReminder } from "./TaskBox";
import { addNewDivToOngoingTask } from "./TaskBox";
import { loadFromInput } from "./TaskBox";
import { deleteTask } from "./TaskBox";
import { loadDetails } from "./TaskBox";
import axios from "axios";


function Body() {
  const [taskTitle, setTaskTitle] = useState("")
  const [showDescription, setShowDescription] = useState(false)
  const [description, setDescription] = useState("")
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const getUser = async () => {
      try {
        const id = localStorage.getItem("id")
        if (!id) window.location.replace("/loginSignup")
        const res = await axios.get("http://localhost:5000/allTasks/" + id, {
          body: {
            id: localStorage.getItem("id")
          }
        })
        const data = res.data

        console.log(tasks)

        setTimeout(() => {
          console.log(tasks)
        }
          , 2000)
        
        setTasks(data)

        console.log(tasks)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])
  const handleNewTask = async () => {
    try {
      await axios.patch("http://localhost:5000/task", {
        TaskName: taskTitle,
        TaskId: 1,
        id: localStorage.getItem("id")
      })
      setTaskTitle("")
    } catch (error) {
      console.log(error)
    }
  }

  

  const handleTaskClick = async (task) => {
    console.log(task)
      const description = prompt("Enter task description:");
      if (description !== null) {
        try {
          await axios.patch("http://localhost:5000/task", {
            TaskName: task.title,
            TaskId: task._id, // Assuming _id is the unique identifier of the task
            id: localStorage.getItem("id"),
            Description: description
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
  return (
    <>

      {/* <img src="https://armory.visualsoldiers.com/wp-content/uploads/2021/09/parallax-scroll-animations.jpg" alt="" /> */}
      <div id="main" className="container-fluid vh-100 overflow-hidden">

        <div id="mainrow" className="row container-fluid">
          <div id="reminder" className="col-4 container-fluid">
            <center><h4 id="reminder_title" className="title_font">Ongoing Task</h4></center>

            <button onClick={() => addNewDivToReminder("Reminder")}>Add Reminder</button>
            {/* <button onClick={ModalBox}>Add New Div</button> */}
          </div>
          <div id="task" className="col-4 container-fluid">

            <input id="add_task_input" type="text" placeholder="Enter Task"
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <button id="add_task_button" onClick={handleNewTask} >+</button>
            <div id="ongoing_task" className="container-fluid">
              <center><h4 className="title_font">Ongoing Task</h4></center>
              {tasks.length === 0 && <div>No Tasks</div>}
              {tasks.map((task) => (
                <li key={task._id}>
                  <div
                  style={{cursor: "pointer",color:"white"}}
                    onClick={() => handleTaskClick(task)}>Title: {task.title}</div>
                </li>
              ))}
            </div>
            <div id="done_task" className="container-fluid">
              <center><h4 className="title_font">Completed Task</h4></center>

              {/* <button onClick={()=>deleteTask("1")}>hello</button> */}
            </div>
          </div>
          <div id="recommend" className="col-4 container-fluid">
            <div id="task_details" className="container-fluid">
              <center><h4 className="title_font">Task Description</h4></center>
              {showDescription && <div>{description}</div>}

              {/* <input id="get_description" placeholder="enter details" type="text" /> */}
              {/* <button id="description_button"></button> */}
              <div id="details" className="details container">No Description</div>
            </div>
            <div id="task_recommendation" className="container-fluid">

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Body;
