const taskInput = document.getElementById("new-task");
const dateInput = document.getElementById("due-date");
const addButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const taskCounter = document.getElementById("task-counter");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// ================================
// Save Tasks to Local Storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleComplete(index) {
  tasks[index].completed = true;

  const li = taskList.children[index];
  const textSpan = li.querySelector('.task-text');

  textSpan.classList.add('cross-out');
  textSpan.addEventListener('animationend', () => {
    archiveTask(index);
  }, { once: true }); // Only listen once
}


function formatDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const dueDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const friendly = date.toLocaleDateString(undefined, options);

  if (dueDate < today) {
    const diff = Math.abs(Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24)));
    return `<span>Due: ${friendly}</span>
            <span class="due-badge badge-overdue">Overdue by ${diff} day${diff > 1 ? "s" : ""}</span>`;
  } else if (dueDate.getTime() === today.getTime()) {
    return `<span>Due: ${friendly}</span>
            <span class="due-badge badge-today">Due Today</span>`;
  } else if (dueDate.getTime() === tomorrow.getTime()) {
    return `<span>Due: ${friendly}</span>
            <span class="due-badge badge-tomorrow">Due Tomorrow</span>`;
  } else {
    return `Due: ${friendly}`;
  }
}


function renderTasks() {
  tasks.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date) - new Date(b.date);
  });

  const completedCount = tasks.filter(t => t.completed).length;
  taskCounter.textContent = tasks.length - completedCount;

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");


    if (task.date) {
      const due = new Date(task.date);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dueDate = new Date(due.getFullYear(), due.getMonth(), due.getDate());

      if (dueDate < today) li.classList.add("overdue");
      else if (dueDate.getTime() === today.getTime()) li.classList.add("due-today");
      else if (dueDate.getTime() === tomorrow.getTime()) li.classList.add("due-tomorrow");
    }


    li.innerHTML = `
      <div class="task-header">
        <div class="left-side">
          <input
            type="checkbox"
            ${task.completed ? "checked" : ""}
            onchange="toggleComplete(${index})"
          >
          <span class="task-text">${task.text}</span>
        </div>
        <div class="right-side">
          <button onclick="editTask(${index})">✏️</button>
          <button onclick="deleteTask(${index})">X</button>
        </div>
      </div>
      ${task.date ? `<div class="due-date">${formatDate(task.date)}</div>` : ""}
    `;
    taskList.appendChild(li);
  });
}


function archiveTask(index) {
  const completedTask = tasks.splice(index, 1)[0]; // Remove from active tasks
  saveTasks();

  const archived = JSON.parse(localStorage.getItem("archivedTasks")) || [];
  archived.push(completedTask); // Add to archive
  localStorage.setItem("archivedTasks", JSON.stringify(archived));

  renderTasks(); // Refresh task list
}


function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  const newDate = prompt("Edit due date (YYYY-MM-DD):", tasks[index].date);

  if (newText !== null) tasks[index].text = newText.trim();
  if (newDate !== null) tasks[index].date = newDate.trim();

  saveTasks();
  renderTasks();
}


addButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const dueDate = dateInput.value;

  if (!taskText) return; // Ignore empty task

  tasks.push({ text: taskText, date: dueDate, completed: false });
  saveTasks();
  taskInput.value = "";
  dateInput.value = "";
  renderTasks();
});


taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addButton.click();
});

document.getElementById("reset-semester").addEventListener("click", () => {
  document.getElementById("semester-end").value = "";
  document.getElementById("countdown-display").style.display = "none";
});


