function handleLogin() {
    const username = document.getElementById('username').value;
    localStorage.setItem('username', username);
    window.location.href = 'main.html';
}

if (document.getElementById('loginBtn')) {
    document.getElementById('loginBtn').addEventListener('click', handleLogin);
}

function editTask(li) {
    const currentText = li.firstChild.textContent.trim();
    const input = document.createElement('input');
    input.value = currentText;
    li.innerHTML = '';
    li.appendChild(input);
    input.focus();

    const saveEdit = function() {
        const newText = input.value.trim() || 'Untitled Task';
        li.innerHTML = `${newText} <span class="edit-icon" style="cursor: pointer; margin-left: 10px;">✏️</span>` +
                       `<span class="delete-icon" style="cursor: pointer; margin-left: 10px;">❌</span>`+
                       `<input type="checkbox" class="сompletedtask">`;
        // Обработчики больше не добавляем вручную — всё через делегирование
    };

    input.addEventListener('blur', saveEdit);
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const task = taskInput.value.trim();
    if (task) {
        const li = document.createElement('li');
        li.innerHTML = `${task} <span class="edit-icon" style="cursor: pointer; margin-left: 10px;">✏️</span>` +
                       `<span class="delete-icon" style="cursor: pointer; margin-left: 10px;">❌</span>`+
                       `<input type="checkbox" class="сompletedtask">`;
        // Обработчики не добавляем — будут обработаны через делегирование
        taskList.appendChild(li);
        taskInput.value = '';
    }
}

if (document.getElementById('addTaskBtn')) {
    document.getElementById('addTaskBtn').addEventListener('click', addTask);
}

if (document.getElementById('userDisplay')) {
    const username = localStorage.getItem('username') || 'Guest';
    document.getElementById('userDisplay').textContent = username;
}


const taskList = document.getElementById('taskList');
if (taskList) {
    taskList.addEventListener('click', function(e) {
        const target = e.target;
        if (target.classList.contains('delete-icon')) {
            // Удаляем родительский <li> при клике на корзину
            target.closest('li').remove();
        } else if (target.classList.contains('edit-icon')) {
            // Запускаем редактирование при клике на карандаш
            editTask(target.closest('li'));
        }
    });
}
