const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


loadEventListeners();

function loadEventListeners() {

    document.addEventListener('DOMContentLoaded', takeList);

    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);

}

function takeList() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {

        const li = document.createElement('li');

        li.className = 'collection-item';

        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');

        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link);

        taskList.appendChild(li);

    });
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Data has been saved!');
    }


    const li = document.createElement('li');

    li.className = 'collection-item';

    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');

    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);

    saveData(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
}

function saveData(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}



// DELETE/ITEM
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure want to delete this tasks?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

// REMOVE/CLEAR ALL LISTS
function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

// FILTER
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

