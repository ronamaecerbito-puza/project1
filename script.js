// Selecting DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');

// State Management
let tasks = [];

// Helper Function: Update Remaining Count
function updateCounter() {
  const remainingTasks = tasks.filter(task => !task.completed).length;
  taskCount.textContent = `${remainingTasks} task${remainingTasks === 1 ? '' : 's'} remaining`;
}

// Function to render tasks into HTML
function renderTasks() {
  taskList.innerHTML = ''; // Clear current view

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;

    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${index})">&times;</button>
    `;

    taskList.appendChild(li);
  });

  updateCounter();
}

// Event: Add New Task
taskForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent page reload
  
  const text = taskInput.value.trim();
  if (text !== '') {
    tasks.push({ text: text, completed: false });
    taskInput.value = ''; // Reset input field
    renderTasks();
  }
});

// Function: Toggle Complete/Incomplete
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Function: Delete Task
function deleteTask(index) {
  tasks.splice(index, 1); // Remove 1 item at specified index
  renderTasks();
}
