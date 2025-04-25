const archiveList = document.getElementById("archive-list");
const archivedTasks = JSON.parse(localStorage.getItem("archivedTasks")) || [];

archivedTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("completed");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text + (task.date ? ` — Due: ${task.date}` : "");

    const putBackBtn = document.createElement("button");
    putBackBtn.textContent = "Put Back?";
    putBackBtn.classList.add("put-back");
    putBackBtn.addEventListener("click", () => {
        // Remove from archive
        archivedTasks.splice(index, 1);
        localStorage.setItem("archivedTasks", JSON.stringify(archivedTasks));

        // Add back to tasks
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ ...task, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Reload archive list
        location.reload();
    });

    li.appendChild(taskSpan);
    li.appendChild(putBackBtn);
    archiveList.appendChild(li);
});
