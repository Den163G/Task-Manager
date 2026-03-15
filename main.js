// Функция для обработки клика по кнопке login
function handleLogin() {
    // Сохранение username в localStorage
    const username = document.getElementById('username').value;
    localStorage.setItem('username', username);
    // Перенаправление на main.html
    window.location.href = 'main.html';
}

// Добавление обработчика события к кнопке login, если она существует
if (document.getElementById('loginBtn')) {
    document.getElementById('loginBtn').addEventListener('click', handleLogin);
}

// Функция для редактирования задачи
function editTask(li) {
    const currentText = li.firstChild.textContent.trim();
    const input = document.createElement('input');
    input.value = currentText;
    li.innerHTML = '';
    li.appendChild(input);
    input.focus();
    const saveEdit = function() {
        const newText = input.value.trim() || 'Untitled Task';
        li.innerHTML = `${newText} <span class="edit-icon" style="cursor: pointer; margin-left: 10px;">✏️</span>`;
        li.querySelector('.edit-icon').addEventListener('click', () => editTask(li));
    };
    input.addEventListener('blur', saveEdit);
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });
}

// Функция для добавления задачи
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const task = taskInput.value.trim();
    if (task) {
        const li = document.createElement('li');
        li.innerHTML = `${task} <span class="edit-icon" style="cursor: pointer; margin-left: 10px;">✏️</span>`;
        // Добавление обработчика для редактирования при клике на иконку
        li.querySelector('.edit-icon').addEventListener('click', () => editTask(li));
        taskList.appendChild(li);
        taskInput.value = '';
    }
}

// Добавление обработчика события к кнопке addTaskBtn, если она существует
if (document.getElementById('addTaskBtn')) {
    document.getElementById('addTaskBtn').addEventListener('click', addTask);
}

// Отображение username на main.html, если элемент существует
if (document.getElementById('userDisplay')) {
    const username = localStorage.getItem('username') || 'Guest';
    document.getElementById('userDisplay').textContent = username;
}
