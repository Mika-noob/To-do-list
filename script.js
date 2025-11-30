let tasks = [];

// Load saved tasks on start
window.onload = function() {
    let saved = localStorage.getItem("tasks");

    if (saved) {
        tasks = JSON.parse(saved);
        renderTasks();
    }
};

function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (text === "") return;

    tasks.push({ text: text, completed: false });
    input.value = "";
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let div = document.createElement("div");
        div.className = "task" + (task.completed ? " completed" : "");

        div.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTask(${index})">
            <label>${task.text}</label>
        `;

        list.appendChild(div);
    });
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
