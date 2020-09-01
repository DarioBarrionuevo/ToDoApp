// PRINCIPAL COGER LISTA DE TAREAS
const taskListIncompleted = document.querySelector('.incompletedTasks');
const taskListCompleted = document.querySelector('.completedTasks');

async function getTaskList() {
    const getList = () => {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/verTareas', {
                    method: 'get'
                })
                .then(res => res.json())
                .then(json => resolve(json))
                .catch(err => reject(err));

        });
    }
    const taskList = await getList();
    // console.log('TASKLIST', taskList);
    printTasks(taskList);
}

// ---------------------------------------------------------------------------------------------
// PINTAR TAREAS
function printTasks(taskList) {
    // console.log('dentro de mostrar tareas', taskList);

    taskListIncompleted.innerHTML = '';
    taskListCompleted.innerHTML = '';
    for (const task of taskList) {
        // console.log('dentro del for of', task);
        const div = document.createElement('div');
        div.className = 'chequeado';
        div.dataset.id = task.user_id;

        const divContainer = document.createElement('div');
        div.className = 'containerTask';
        div.dataset.id = task.user_id;

        const p = document.createElement('p');
        p.innerText = task.tarea;

        const button = document.createElement('button');
        button.innerText = 'ELIMINAR';
        button.dataset.id = task.user_id;
        button.addEventListener('click', deleteTask);

        const checkCompleted = document.createElement('input');
        checkCompleted.type = 'checkbox';
        checkCompleted.dataset.id = task.user_id;
        checkCompleted.checked = task.completed;
        checkCompleted.addEventListener('change', changeCompleted);

        div.appendChild(checkCompleted);
        div.appendChild(p);

        divContainer.appendChild(div);
        divContainer.appendChild(button);

        if (task.completed === 0) {
            taskListIncompleted.appendChild(divContainer);
        } else {
            div.style.textDecoration = 'line-through';
            div.style.textDecorationColor = 'black';
            taskListCompleted.appendChild(divContainer);
        }

    }
};


// ---------------------------------------------------------------------------------------------
//  BORRAR TAREA
async function deleteTask(event) {
    let id = event.target.dataset.id;
    // console.log('desde el boton eliminar', event.target.dataset.id);
    await fetch(`http://localhost:3000/delete/${id}`, {
            method: 'delete'
        })
        .then((res) => {
            // console.log(res);
            getTaskList();

        })
};

// ---------------------------------------------------------------------------------------------
//  CAMBIAR DE INCOMPLETA A COMPLETA
async function changeCompleted(event) {
    // console.log(event.target.dataset.id);
    let id = event.target.dataset.id;

    await fetch(`http://localhost:3000/update/${id}`, {
        method: 'put'
    }).then((res) => {
        // console.log(res);
        getTaskList();

    })
}

// ---------------------------------------------------------------------------------------------
// AÑADIR TAREA A LA BBDD
const btnAddTask = document.querySelector('.addTask');
const inputTask = document.getElementById('inputTask');

async function addTaskBBDD() {
    var tarea = {
        valor: inputTask.value,
        completed: false
    };
    // var tarea = input.value;
    // console.log(tarea);
    await fetch('http://localhost:3000/addTask', {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(tarea),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((res) => {
            // console.log(res);
            getTaskList();

        })

};
// EVENTO CLICK
btnAddTask.addEventListener('click', function () {
    addTaskBBDD();
    inputTask.value = '';

});

inputTask.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        btnAddTask.click();
        inputTask.value = '';
    }
});


// -----------------------------------------------------------------------------------------------------------
// RESETEAR VACIANDO LA LISTA
const btndeleteAll = document.getElementById('btnReset'); //SI QUIERO PONER UN RESET

function deleteAllTaskBBDD() {
    fetch('http://localhost:3000/deleteAll', {
        method: 'delete'
    }).then((res) => {
        // console.log(res);
        getTaskList();

    })

};
// EVENTO CLICK
btndeleteAll.addEventListener('click', deleteAllTaskBBDD);

getTaskList();