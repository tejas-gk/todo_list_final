import axios from "axios";
 

//which task count
let task_count=0;

const path="http://localhost:5000";//path

export const addNewDivToReminder = async (content) => {
    // Create a new div element
    const newDiv = document.createElement("div");
    newDiv.className = "added-reminder-div";
    newDiv.textContent = content; // You can set the content as needed
    
    // Append the new div to the "reminder" section
    const reminderSection = document.getElementById("reminder");
    reminderSection.appendChild(newDiv);

    // await axios.post(path+"/Task",{
        
    // })

};

    
export const addNewDivToOngoingTask = (content) => {
    // Create a new div element
    const newDiv = document.createElement("div");
    const button_div=document.createElement("div");
    const addButton=document.createElement("button")
    const info_div=document.createElement("div");
    info_div.className="info_div";
    
    newDiv.id=task_count;
    const current_id=task_count;
    task_count+=1;

    info_div.addEventListener('click', () => {
        loadDetails(current_id);
        // console.log('click_generated'); // Replace with your custom logic
    });

    
    //for the css class
    newDiv.className = "added-task-div";
    
    newDiv.textContent = "● "+content; // You can set the content as needed
    
    addButton.className="del_button";
    // addButton.textContent="del";
    

    //complete button
    addButton.onclick=()=>{
        deleteTask(current_id);
    }

    button_div.appendChild(addButton);
    button_div.id="bd"+current_id;
    button_div.className="container del_button_container";
    newDiv.append(info_div);
    newDiv.appendChild(button_div);
    // Append the new div to the "task" section
    const taskSection = document.getElementById("ongoing_task");
    taskSection.appendChild(newDiv);
    console.log(newDiv)
};

export const addNewDivToDoneTask = (content) => {
    // Create a new div element
    const newDiv = document.createElement("div");
    newDiv.className = "added-task-div";
    newDiv.textContent = content; // You can set the content as needed
    
    // Append the new div to the "done task" section
    const taskSection = document.getElementById("done_task");
    taskSection.appendChild(newDiv);
};
//delete task from ongoing task list
export const deleteTask=(task_id)=>{
    const parent_div=document.getElementById("ongoing_task");
    console.log("bd"+task_id)
    const rem_overlay_div=document.getElementById("bd"+task_id);
    rem_overlay_div.innerText="";//erasing overlay div text
    const rem_div=document.getElementById(task_id);
   
    addNewDivToDoneTask(rem_div.innerText);
    // parent_div.removeChild(rem_overlay_div);
    parent_div.removeChild(rem_div);
}

export const loadFromInput=()=>{
    const data=document.getElementById("add_task_input").value;
    addNewDivToOngoingTask(data);
}



const details={}

export const loadDetails = (id) => {
    console.log(id)
    // const parent_div=document.getElementById("task_details");

    if(details[id]){
        document.getElementById("details").innerText=details[id];
        console.log(details[id]+" in "+id);
    }else{
        
        // let click=document.getElementById("description_button");
        // click.addEventListener("click",function(){
        //     // let des_text=document.getElementById("get_description");
        //     // details[id]=document.createElement("div");
        //     // details[id].innerText=des_text.value;
        //     // console.log(des_text.value);
        //     // details[id].className="details container";
        //     // console.log(details);
        //     // parent_div.appendChild(details[id]);

        //     const det=document.getElementById("details");
        //     det.innerText=document.getElementById("get_description").value;
        //     details[id]=det.cloneNode(true);
        // });
        // taking user input using prompt
        details[id]=prompt("Enter description");
        console.log(details[id]);
     
      
    }
}




