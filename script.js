function saveTasks() {
    const tasklist = document.getElementById("taskList");
    const tasks = [];
    tasklist.querySelectorAll("li").forEach((li) => {
        const span = li.querySelector("span");
        tasks.push(span.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const tasklist = document.getElementById("taskList");
    tasks.forEach((taskText) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="editButton" onClick="editTask(this)">Editar</button>
            <button class="deleteButton" onClick="deleteTask(this)">Remover</button>
        `;
        tasklist.appendChild(li);
    });
}
    
    function addTask() {

        const tasklist = document.getElementById("taskList");
        const taskInput = document.getElementById("taskInput");
        const  priorityInput = document.getElementById("priority");
        const dateInput = document.getElementById("dateInput");
        const taskText = taskInput.value.trim();
        const priorityIn = priorityInput.value;
        const dateIn = dateInput.value;

        if (taskText !== "") {
            const maxText = taskText.substring(0, 30);

            const li = document.createElement("li");
            li.innerHTML = `
            <span>${maxText} (Prioridade: ${priorityIn}, Data: ${dateIn})</span>
            <button class="editButton" onClick="editTask(this)">Editar</button>
            <button class="deleteButton" onClick="deleteTask(this)">Remover</button>
            `;
            tasklist.appendChild(li);
            taskInput.value = "";
            priorityInput.value = 'Baixa';
            dateInput.value = '';

            saveTasks();
        }
    }
    function editTask(button) {
        const li = button.parentElement;
        const span = li.querySelector("span");
        const newText = prompt("Editar tarefa:", span.textContent);
        if(newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
            saveTasks();
        }
    }
    function deleteTask(button) {
        const li = button.parentElement;
        li.remove();
        saveTasks();
    }

    document.addEventListener("DOMContentLoaded", loadTasks);
