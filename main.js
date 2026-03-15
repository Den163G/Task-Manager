
        // ========== ЛОГИН (без изменений) ==========
        function handleLogin() {
            const username = document.getElementById('username').value;
            localStorage.setItem('username', username);
            window.location.href = 'main.html';
        }
        if (document.getElementById('loginBtn')) {
            document.getElementById('loginBtn').addEventListener('click', handleLogin);
        }

        // ========== ОТОБРАЖЕНИЕ ИМЕНИ ПОЛЬЗОВАТЕЛЯ ==========
        if (document.getElementById('userDisplay')) {
            const username = localStorage.getItem('username') || 'Guest';
            document.getElementById('userDisplay').textContent = username;
        }

        // ========== РЕДАКТИРОВАНИЕ ЗАДАЧИ ==========
        function editTask(li) {
            // Получаем текст из span (теперь текст внутри span)
            const textSpan = li.querySelector('.task-text');
            const currentText = textSpan.textContent.trim();
            const wasChecked = li.querySelector('.task-checkbox').checked;

            // Создаём поле ввода
            const input = document.createElement('input');
            input.value = currentText;
            li.innerHTML = '';
            li.appendChild(input);
            input.focus();

            const saveEdit = function() {
                const newText = input.value.trim() || 'Untitled Task';
                // Восстанавливаем структуру с span для текста и правильными классами
                li.innerHTML = `
                    <input type="checkbox" class="task-checkbox" style="margin-right: 10px;" ${wasChecked ? 'checked' : ''}>
                    <span class="task-text">${newText}</span>
                    <span class="edit-icon" style="cursor: pointer; margin-left: 10px;">✏️</span>
                    <span class="delete-icon" style="cursor: pointer; margin-left: 10px;">❌</span>
                `;
                // Если чекбокс был отмечен, сразу добавляем класс completed
                if (wasChecked) {
                    li.querySelector('.task-text').classList.add('completed');
                }
            };

            input.addEventListener('blur', saveEdit);
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    saveEdit();
                }
            });
        }

        // ========== ДОБАВЛЕНИЕ ЗАДАЧИ ==========
        function addTask() {
            const taskInput = document.getElementById('taskInput');
            const taskList = document.getElementById('taskList');
            const task = taskInput.value.trim();
            if (task) {
                const li = document.createElement('li');
                // Добавляем чекбокс, текст в span, иконки
                li.innerHTML = `
                    <input type="checkbox" class="task-checkbox" style="margin-right: 10px;">
                    <span class="task-text">${task}</span>
                    <span class="edit-icon" style="cursor: pointer; margin-left: 10px;">✏️</span>
                    <span class="delete-icon" style="cursor: pointer; margin-left: 10px;">❌</span>
                `;
                taskList.appendChild(li);
                taskInput.value = '';
            }
        }

        if (document.getElementById('addTaskBtn')) {
            document.getElementById('addTaskBtn').addEventListener('click', addTask);
        }

        // ========== ДЕЛЕГИРОВАНИЕ СОБЫТИЙ ==========
        const taskList = document.getElementById('taskList');
        if (taskList) {
            // Обработка кликов (иконки удаления и редактирования)
            taskList.addEventListener('click', function(e) {
                const target = e.target;
                if (target.classList.contains('delete-icon')) {
                    target.closest('li').remove();
                } else if (target.classList.contains('edit-icon')) {
                    editTask(target.closest('li'));
                }
            });

            // Обработка изменения состояния чекбокса (зачёркивание)
            taskList.addEventListener('change', function(e) {
                if (e.target.classList.contains('task-checkbox')) {
                    const li = e.target.closest('li');
                    const textSpan = li.querySelector('.task-text');
                    if (e.target.checked) {
                        textSpan.classList.add('completed');
                    } else {
                        textSpan.classList.remove('completed');
                    }
                }
            });
        }
