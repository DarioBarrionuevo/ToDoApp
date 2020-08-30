const btnAddTask = document.querySelector('.addTask');
const btnAddTask2 = document.querySelector('.addTask2');
const btndeleteAll = document.querySelector('.deleteAll');

const taskListIncompleted = document.querySelector('.incompletedTasks');

const input = document.querySelector('.input');




function printTasks() {
    // console.log('dentro de mostrar tareas');

    fetch('http://localhost:3000/verTareas', {
            method: 'get'
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
    // .then((json) => res.send(json.results[0]));

};

function addTaskBBDD() {
    var tarea = {
        valor: input.value,
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
        .then((res) => console.log(res.json()))
    // .catch((err) => console.log('errorrrrr', err))
    //FIXME Me lanza el error pero manda la informacion a la base de datos
};

function deleteAllTaskBBDD() {
    fetch('http://localhost:3000/deleteAll', {
            method: 'delete'
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
}

btnAddTask.addEventListener('click', printTasks);
btnAddTask2.addEventListener('click', addTaskBBDD);
btndeleteAll.addEventListener('click', deleteAllTaskBBDD);