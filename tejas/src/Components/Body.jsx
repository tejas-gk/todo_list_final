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
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    try {
      const getUser = async () => {
        const id = localStorage.getItem("id")
        if (!id) window.location.replace("/loginSignup")
        const res=await axios.get("http://localhost:5000/allTasks/"+id, {
          body: {
            id: localStorage.getItem("id")
          }
        })
          const data=res.data
        setTasks(data)
        console.log(tasks)
        
      }
      getUser()
    } catch (error) {
      console.log(error)
    }
  }, [])
  const handleNewTask = async () => {
    try {
      await axios.patch("http://localhost:5000/task", {
        TaskName: taskTitle,
        TaskId: 1,
        id: localStorage.getItem("id")
      })
      setTaskTitle("")
      window.location.reload()
    } catch (error) {
      console.log(error)
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
                  <div>Title: {task.title}</div>
                  <div>Description: {task.description}</div>
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
