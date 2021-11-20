// Variables
const formUI = document.querySelector('#form');
const taskListUI = document.querySelector('#taskList');
let arrayTasks = [];
let id = -1;
let txt = '';

// Funciones

const addItem = (task) => {
    let item = {
        task: task,
        status: false
    }
    if (id == -1) {
        arrayTasks.push(item);
    } else {
        arrayTasks[id].task = task;
        var obj = taskListUI.childNodes[id];
        obj.innerHTML = obj.innerHTML.replace(txt, task);
        id = -1;
        txt = '';
        saveDB();
    }
    return item;
}

const saveDB = () => {
    localStorage.setItem('task', JSON.stringify(arrayTasks));
    getDB();
}

const getDB = () => {
    taskList.innerHTML = '';
    arrayTasks = JSON.parse(localStorage.getItem('task'));
    if (arrayTasks === null) {
        arrayTasks = [];
    } else {
        arrayTasks.forEach(element => {
            if (element.status) {
                taskListUI.innerHTML += `<div class="alert alert-success" role="alert"><span class="float-start"><i class="material-icons mr-2">done</i></span><b>${element.task}</b> - Completado<span class="float-end"><i class="material-icons">edit</i><i class="material-icons">delete</i></span></div>`
            } else {
                taskListUI.innerHTML += `<div class="alert alert-danger" role="alert"><span class="float-start"><i class="material-icons mr-2">done</i></span><b>${element.task}</b> - En Espera<span class="float-end"><i class="material-icons">edit</i><i class="material-icons">delete</i></span></div>`
            }
        });
    }
}

const deleteDB = (task) => {
    let indexArray;
    arrayTasks.forEach((element, index) => {

        if (element.task === task) {
            indexArray = index;
        }
    });

    arrayTasks.splice(indexArray, 1);
    saveDB();
}

const doneDB = (task) => {
    let indexArray = arrayTasks.findIndex((element) => element.task === task);

    arrayTasks[indexArray].status = true;
    saveDB();
}

const editDB = (task) => {
    let indexArray = arrayTasks.findIndex((element) => element.task === task);
    txt = task;
    id = indexArray;
    document.querySelector('#task').value = task;
}

// Eventos del DOM

formUI.addEventListener('submit', (e) => {
    e.preventDefault();
    let taskUI = document.querySelector('#task').value;

    addItem(taskUI);
    saveDB();
    formUI.reset();
});

document.addEventListener('DOMContentLoaded', getDB);

taskListUI.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.innerHTML == 'done' || e.target.innerHTML === 'delete' || e.target.innerHTML === 'edit') {
        let text = e.path[2].childNodes[1].innerHTML;
        if (e.target.innerHTML == 'delete') {
            deleteDB(text);
        }
        if (e.target.innerHTML == 'done') {
            doneDB(text);
        }
        if (e.target.innerHTML == 'edit') {
            editDB(text);
        }
    }
});