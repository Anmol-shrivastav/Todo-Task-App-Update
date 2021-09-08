let filters = document.querySelectorAll(".filter");
let container = document.querySelector(".container");
let ticketBox = document.querySelector(".ticket-box");
let priorityContainer = document.querySelectorAll(".priority-container");
let addbtn = document.querySelector(".add-btn");
let removebtn = document.querySelector(".remove-btn");
let closeBtn = document.querySelector(".cross-btn");
var currColor = "red";

closeBtn.addEventListener("click", function(){
    let fullTicketDisplay = document.querySelector(".full-ticket-display");
    fullTicketDisplay.style.display = "none";
    closeBtn.style.display = "none";
});

function openTicket(task, e){
    console.log(task);
    console.log("3");
    let fullTicketDisplayTask = document.querySelector(".full-ticket-display-task");
    fullTicketDisplayTask.innerText = task;

    let fullTicketDisplay = document.querySelector(".full-ticket-display");
    fullTicketDisplay.style.display = "block";
    closeBtn.style.display = "block";
}

//add tickets based on requirement 
function addTicketRequirement(taskId, color, ticketTask){
    // console.log(taskId);
    // console.log(color);
    // console.log(ticketTask);
    
    let ticket = document.createElement("div");
    ticket.classList.add("ticket-display");

    let colorBox = document.createElement("div");
    colorBox.style.backgroundColor = color;
    colorBox.classList.add("ticket-color");
    ticket.appendChild(colorBox);

    let id = document.createElement("div");
    id.classList.add("ticket-id");
    id.innerText = "Task Id = " + taskId;
    ticket.appendChild(id);

    let task = document.createElement("div");
    task.classList.add("task");
    task.innerText = ticketTask;
    ticket.appendChild(task);

    ticketBox.appendChild(ticket);           //adding ticket 

    ticket.addEventListener("click", selectTicket);           //when we click on any ticket
    ticket.addEventListener("dblclick", openTicket.bind(this,ticketTask));        //when we want to see ticket on full screen
}

//Load Tickets
function loadTickets(){
    allTasks = JSON.parse(localStorage.getItem("allTasks"));
    console.log("1");
    for(let i = 0; i<allTasks.length; i++){
        let color = allTasks[i].priority;
        let taskId = allTasks[i].ticketId;
        let ticketTask = allTasks[i].task;

        let ticket = document.createElement("div");
        ticket.classList.add("ticket-display");

        let colorBox = document.createElement("div");
        colorBox.style.backgroundColor = color;
        colorBox.classList.add("ticket-color");
        ticket.appendChild(colorBox);

        let id = document.createElement("div");
        id.classList.add("ticket-id");
        id.innerText = "Task Id = " + taskId;
        ticket.appendChild(id);

        let task = document.createElement("div");
        task.classList.add("task");
        task.innerText = ticketTask;
        ticket.appendChild(task);

        ticketBox.appendChild(ticket);           //adding ticket 

        ticket.addEventListener("click", selectTicket);           //when we click on any ticket
        
        ticket.addEventListener("dblclick", openTicket.bind(this,ticketTask));        //when we want to see ticket on full screen
        console.log("2");
    }
}

function removeAllTicketFromDisplay(){
    let allTickets = document.querySelectorAll(".ticket-display");
    for(let i=0; i<allTickets.length; i++){
        allTickets[i].remove();
    }
}

for(let i=0; i<filters.length; i++){
    filters[i].addEventListener("click", changecolor);
}

function changecolor(e){
    for(let i=0; i<filters.length; i++){
        if(filters[i].classList.contains("active")){
            filters[i].classList.remove("active");
        }
    }
    e.currentTarget.classList.add("active");
    let classname = e.currentTarget.children[0].classList[0];
    let color = classname.split("-")[0];
    //console.log(color);
    container.style.backgroundColor = color;

    //add Tickets as per background color
    let allTasks = JSON.parse(localStorage.getItem("allTasks"));   //fetch all tickets from localstorage
    removeAllTicketFromDisplay();
    for(let i=0; i<allTasks.length; i++){
        let taskColor = allTasks[i].priority;
        let taskId = allTasks[i].ticketId;
        let ticketTask = allTasks[i].task;
        
        if(taskColor == color){
            addTicketRequirement(taskId, taskColor, ticketTask);
        }
    }
}

function deleteTask(){
    let selectedTickets = document.querySelectorAll(".active-ticket");
    let allTasks = JSON.parse(localStorage.getItem("allTasks"));
    for(let i=0; i<selectedTickets.length; i++){
        selectedTickets[i].remove();
        let id = selectedTickets[i].children[1].innerHTML.split(" ")[3];

        for(let j=0; j<allTasks.length; j++){
            if(allTasks[j].ticketId == id){
                allTasks.splice(j,1);                   //array.splice(delete start index, delete count)
                break;                                  //delete array when found id matched
            }
        }

    }

    localStorage.removeItem("allTasks");                  //Clear the local storage

    localStorage.setItem("allTasks", JSON.stringify(allTasks));   //add new data to local storage

}

function openModal(){
    let modalBox = document.querySelector(".modal");
    modalBox.style.display = "flex";

    let ticket = document.querySelector(".ticket");
    ticket.innerHTML = "Enter your task here...";
    ticket.setAttribute("data-typed", false);
}

let ticket = document.querySelector(".ticket");

ticket.addEventListener("click", function(){
    let isTyped = ticket.getAttribute("data-typed");
    if(isTyped == "false"){
        ticket.innerHTML = "";
        ticket.setAttribute("data-typed", true);
    }
});

for(let i=0; i<priorityContainer.length; i++){
    priorityContainer[i].addEventListener("click", changePriority);
}

function changePriority(e){
    for(let i=0; i<priorityContainer.length; i++){
        if(priorityContainer[i].classList.contains("active")){
            priorityContainer[i].classList.remove("active");
        }
    }
    e.currentTarget.classList.add("active");
    currColor = e.currentTarget.children[0].classList[1].split("-")[1];
    ticket.click();
    ticket.focus();
}

ticket.addEventListener("keypress", addTicket);

var _generatedUIDs = {};
function uid() {
    while (true) {
        var uid = ("0000" + ((Math.random() * Math.pow(36, 4)) | 0).toString(36)).slice(-4);
        if (!_generatedUIDs.hasOwnProperty(uid)) {
            _generatedUIDs[uid] = true;
            return uid;
        }
    }
}

function selectTicket(e){
    if(e.currentTarget.classList.contains("active-ticket")){
        e.currentTarget.classList.remove("active-ticket");
    }else{
        e.currentTarget.classList.add("active-ticket");
    }
}

function addTicket(e){
    let text = document.querySelector(".ticket").innerText;
    if(e.key == "Enter" && text.trim() != ""){

        let ticket = document.createElement("div");
        ticket.classList.add("ticket-display");

        let colorBox = document.createElement("div");
        colorBox.style.backgroundColor=currColor;
        colorBox.classList.add("ticket-color");
        ticket.appendChild(colorBox);

        let id = document.createElement("div");
        id.classList.add("ticket-id");
        let taskID = uid();
        id.innerText = "Task Id = " + taskID;
        ticket.appendChild(id);

        let task = document.createElement("div");
        task.classList.add("task");
        task.innerText = text;
        ticket.appendChild(task);

        ticketBox.appendChild(ticket);           //adding ticket 

        ticket.addEventListener("click", selectTicket);         //when we click on any ticket 
        ticket.addEventListener("dblclick", openTicket.bind(this,text));        //when we double click on any ticket for open in full screen mode
        
        allDisplayTickets = document.querySelectorAll(".ticket-display");


        document.querySelector(".modal").style.display = "none";

        //local storage
        let allTasks = localStorage.getItem("allTasks");
        if(allTasks == null){
            let data = [{"ticketId" : taskID, "task" : text, "priority" : currColor}];
            localStorage.setItem("allTasks", JSON.stringify(data));
        }else{
            let data = JSON.parse(allTasks);
            data.push({"ticketId" : taskID, "task" : text, "priority" : currColor});  
            localStorage.setItem("allTasks", JSON.stringify(data));
        }

        currColor = "red";
        priorityContainer[0].click();

    }else if(e.key == "Enter"){
        e.preventDefault();
        alert("Error: Empty task can't be add.");
    }
}
