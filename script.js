document.addEventListener("DOMContentLoaded", loadTasks);
document.getElementById("add-task-btn").addEventListener("click", addTask);
document.getElementById("task-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    let taskInput = document.getElementById("task-input");
    let taskList = document.getElementById("task-list");

    if (taskInput.value.trim() === "") return;

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.onchange = updateProgress;

    let span = document.createElement("span");
    span.textContent = taskInput.value;
    span.classList.add("task-text");

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () {
        li.remove();
        saveTasks();
        updateProgress();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";
    saveTasks();
    updateProgress();
}

function updateProgress() {
    let tasks = document.querySelectorAll("#task-list li");
    let completedTasks = document.querySelectorAll("#task-list li input:checked");

    document.getElementById("total-count").textContent = tasks.length;
    document.getElementById("completed-count").textContent = completedTasks.length;

    let progress = document.getElementById("progress");
    progress.style.width = tasks.length ? (completedTasks.length / tasks.length) * 100 + "%" : "0%";

    if (tasks.length > 0 && completedTasks.length === tasks.length) {
        document.getElementById("completion-message").textContent = "Great Job! 🎉🎉";
    } else {
        document.getElementById("completion-message").textContent = "";
    }
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#task-list li").forEach(task => {
        let text = task.querySelector(".task-text").textContent;
        let completed = task.querySelector(".checkbox").checked;
        tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("task-list");

    savedTasks.forEach(taskData => {
        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        checkbox.checked = taskData.completed;
        checkbox.onchange = updateProgress;

        let span = document.createElement("span");
        span.textContent = taskData.text;
        span.classList.add("task-text");

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✖";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function () {
            li.remove();
            saveTasks();
            updateProgress();
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    updateProgress();
}
