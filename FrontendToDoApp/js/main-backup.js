// VARIABLE PARA GUARDAR Y PINTAR EN EL LOCALSTORAGE
let tasks = {};


// TRAER DEL HTML

const btnAddTask = document.querySelector('.addTask');
const inputTask = document.getElementById('inputTask');
const btnReset = document.getElementById('btnReset'); //SI QUIERO PONER UN RESET

const taskListIncompleted = document.querySelector('.incompletedTasks');
const taskListCompleted = document.querySelector('.completedTasks');


// FUNCIONES PRINCIPALES PINTAR Y GUARDAR EN EL LOCALSTORAGE

function printTasks() {
    taskListIncompleted.innerHTML = '';
    taskListCompleted.innerHTML = '';
    let count = 0;

    for (let task of tasks) {
        const div = document.createElement('div');
        div.className = 'chequeado';
        div.dataset.id = count;

        const divContainer = document.createElement('div');
        div.className = 'containerTask';
        div.dataset.id = count;

        const p = document.createElement('p');
        p.innerText = task.name;

        const button = document.createElement('button');
        button.innerText = 'ELIMINAR';
        button.dataset.id = count;
        button.addEventListener('click', deleteTask);

        const checkCompleted = document.createElement('input');
        checkCompleted.type = 'checkbox';
        checkCompleted.dataset.id = count;
        checkCompleted.checked = task.completed;
        checkCompleted.addEventListener('change', changeCompleted);

        div.appendChild(checkCompleted);
        div.appendChild(p);

        divContainer.appendChild(div);
        divContainer.appendChild(button);

        if (!task.completed) {
            taskListIncompleted.appendChild(divContainer);
        } else {
            div.style.textDecoration = 'line-through';
            div.style.textDecorationColor = 'black';
            taskListCompleted.appendChild(divContainer);
        }

        count++;
    }
}

// VA GUARDANDO EN EL LOCAL STORAGE
function saveTasks() {
    const tasksStr = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksStr);
}

// HACER LOS EVENTOS


// AÑADIR TAREA
btnAddTask.addEventListener('click', addTask);

function addTask() {
    const task = {};
    if (inputTask.value != '') {
        task.name = inputTask.value;
        task.completed = false;
        tasks.push(task);

        saveTasks();
        printTasks();
        inputTask.value = '';
    } else {
        alert('POR FAVOR NO DEJES EL CAMPO VACIO Y RELLENA UNA TAREA')
    }
}

//  BORRAR TAREA
function deleteTask(event) {
    const id = event.target.dataset.id;
    tasks.splice(id, 1);

    saveTasks();
    printTasks();
}

//  CAMBIAR DE INCOMPLETA A COMPLETA
function changeCompleted(event) {
    tasks[event.target.dataset.id].completed = event.target.checked;

    saveTasks();
    printTasks();
}

// BOTON DE RESETEO DEL LOCALSTORAGE
btnReset.addEventListener('click', () => {
    localStorage.removeItem('tasks');
    tasks = [];
    printTasks();
    inputTask.value = '';
});


// QUE SE EJECUTE LA FUNCION DE PINTAR LA LISTA AL FINAL
printTasks();