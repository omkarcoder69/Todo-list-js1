 // ----------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Step 1: Create DOM elements
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  // Step 2 and step5 : Initialize tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Step 3: Render tasks on page load
  tasks.forEach((task) => renderTask(task));

  // Add a new task
  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText, // Fixed case from 'Text' to 'text'
      completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask); // Render the task after adding
    todoInput.value = ""; // Clear input
  });
  // ----------------------------------------------------------------------------------------

  // Render a task in the list
  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete-btn">Delete</button>
    `;

    // Toggle task completion
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return; // Prevent toggle when clicking delete
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    // Delete a task
    li.querySelector(".delete-btn").addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      li.remove(); // Remove the task visually
    });

    todoList.appendChild(li);
  }
  // ------------------------------------------------------------------------------------
  // step 4: Save tasks to localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
