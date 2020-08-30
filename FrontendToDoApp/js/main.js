// PRINCIPAL COGER LISTA DE TAREAS Y HACER COSAS CON ELLAS
const taskListIncompleted = document.querySelector('.incompletedTasks');
const taskListCompleted = document.querySelector('.completedTasks');

function printTasks() {
    // console.log('dentro de mostrar tareas');

    fetch('http://localhost:3000/verTareas', {
            method: 'get'
        })
        .then((res) => res.json())
        .then((tasks) => {
            taskListIncompleted.innerHTML = '';
            taskListCompleted.innerHTML = '';
            for (const task of tasks) {
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
            };

            //  BORRAR TAREA
            function deleteTask(event) {
                let id = event.target.dataset.id;
                console.log('desde el boton eliminar', event.target.dataset.id);
                fetch(`http://localhost:3000/delete/${id}`, {
                        method: 'delete'
                    })
                    .then((res) => {
                        console.log(res);
                        location.reload();

                    })
            };

        });


};

printTasks();



//  CAMBIAR DE INCOMPLETA A COMPLETA
function changeCompleted(event) {
    // console.log(event.target.dataset.id);
    let id = event.target.dataset.id;

    fetch(`http://localhost:3000/update/${id}`, {
            method: 'put'
        })
        .then((res) => {
            console.log(res);
            location.reload();

        })
}


















// -----------------------------------------------------------------------------------------------------------

// AÑADIR TAREA A LA BBDD
const btnAddTask = document.querySelector('.addTask');
const inputTask = document.getElementById('inputTask');

function addTaskBBDD() {
    var tarea = {
        valor: inputTask.value,
        completed: false
    };
    // var tarea = input.value;
    console.log(tarea);
    fetch('http://localhost:3000/addTask', {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(tarea),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((res) => console.log(res.json()));
    location.reload();
    // printTasks(); // Va muy lento o solo cuando le doy una segunda vez
    // .catch((err) => console.log('errorrrrr', err))
    //FIXME Me lanza el error pero manda la informacion a la base de datos
};
// EVENTO CLICK
btnAddTask.addEventListener('click', addTaskBBDD);

// -----------------------------------------------------------------------------------------------------------

// RESETEAR VACIANDO LA LISTA
const btndeleteAll = document.getElementById('btnReset'); //SI QUIERO PONER UN RESET

function deleteAllTaskBBDD() {
    fetch('http://localhost:3000/deleteAll', {
        method: 'delete'
    })
    // .then((res) => res.json())
    // .then((data) => console.log(data))
    location.reload();
    // printTasks(); // Va muy lento o solo cuando le doy una segunda vez
};
// EVENTO CLICK

btndeleteAll.addEventListener('click', deleteAllTaskBBDD);