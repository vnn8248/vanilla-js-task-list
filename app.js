// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// Event listeners
function loadEventListeners() {
    // DOM load event for stored tasks
    document.addEventListener("DOMContentLoaded", getTasks);
    // Add task event
    form.addEventListener("submit", addTask);
    // Remove task event
    taskList.addEventListener("click", removeTask);
    // Clear all tasks event
    clearBtn.addEventListener("click", clearTasks);
    // Filter tasks event
    filter.addEventListener("keyup", filterTasks);
};

// Add Task
function addTask(e) {
    if(taskInput.value === "") {
        alert("Please add a Task");
        return;
    }

    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    const taskText = document.createTextNode(taskInput.value);
    li.appendChild(taskText);
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = "<i class='fas fa-trash-alt'></i>";
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    // Store in local storage
    storeInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = "";

    e.preventDefault();
}


// Persist data in local storage
function storeInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get tasks from local storage
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task) {
        // Create li element
        const li = document.createElement("li");
        // Add class
        li.className = "collection-item";
        // Create text node and append to li
        const taskText = document.createTextNode(task);
        li.appendChild(taskText);
        // Create new link element
        const link = document.createElement("a");
        // Add class
        link.className = "delete-item secondary-content";
        // Add icon html
        link.innerHTML = "<i class='fas fa-trash-alt'></i>";
        // Append the link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    });
};

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains("delete-item")) {
        // Confirm
        if(confirm("Are you sure?")) {
            const li = e.target.parentElement.parentElement;
            li.remove();

            // Remove task from local storage
            removeTaskFromLocalStorage(li);
        }    
    }
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear All Tasks 
function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // Clear from local storage
    clearTasksFromLocalStorage();
}

// Clear from local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    const list = document.querySelectorAll(".collection-item");
    
    list.forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    })
}