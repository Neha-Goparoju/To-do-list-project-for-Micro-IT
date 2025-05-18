let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const upcoming = document.getElementById('upcoming');
  const completed = document.getElementById('completed');
  const search = document.getElementById('searchInput').value.toLowerCase();

  upcoming.innerHTML = '';
  completed.innerHTML = '';

  tasks.filter(task => task.name.toLowerCase().includes(search) || task.desc.toLowerCase().includes(search))
       .forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task ${task.priority} ${task.completed ? 'completed' : ''}`;
    taskDiv.innerHTML = `
      <div>
        <span>${task.name}</span>
        <div class="task-desc">${task.desc}</div>
      </div>
      <div>
        <button onclick="toggleTask(${task.id})"><i class="fas ${task.completed ? 'fa-undo' : 'fa-check'}"></i></button>
        <button onclick="deleteTask(${task.id})"><i class="fas fa-trash"></i></button>
      </div>
    `;
    (task.completed ? completed : upcoming).appendChild(taskDiv);
  });
}

function addTask() {
  const title = document.getElementById('taskTitle').value.trim();
  const desc = document.getElementById('taskDesc').value.trim();
  const priority = document.getElementById('taskPriority').value;
  if (title) {
    tasks.push({ id: Date.now(), name: title, desc, completed: false, priority });
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDesc').value = '';
    renderTasks();
    saveTasks();
  }
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
  saveTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
  saveTasks();
}

document.getElementById('searchInput').addEventListener('input', renderTasks);

document.getElementById('themeSwitch').addEventListener('change', function() {
  document.body.classList.toggle('dark', this.checked);
});

renderTasks();
