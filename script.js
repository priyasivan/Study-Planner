
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
    const taskList = document.getElementById("taskList");
    const taskCount = document.getElementById("taskCount");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span style="${task.completed ? 'text-decoration: line-through; color: gray;' : ''}">
                ${task.name}
            </span>
            <button onclick="completeTask(${index})">
                ${task.completed ? "Undo" : "Done"}
            </button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        taskList.appendChild(li);
    });

    let completed = tasks.filter(task => task.completed).length;
let pending = tasks.length - completed;
let percentage = tasks.length === 0
    ? 0
    : Math.round((completed / tasks.length) * 100);

document.getElementById("progressFill").style.width = percentage + "%";

document.getElementById("progressText").textContent =
    percentage + "% Completed";

taskCount.textContent = "Total Tasks: " + tasks.length;

document.getElementById("completedCount").textContent =
    "Completed: " + completed;

document.getElementById("pendingCount").textContent =
    "Pending: " + pending;

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const taskName = input.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        name: taskName,
        completed: false
    });

    input.value = "";
    document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
    displayTasks();
}

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

displayTasks();

