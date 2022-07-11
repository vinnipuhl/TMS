// Пример объекта для TODO-элемента: 
// const todo = {
//   id: уникальный ID, // Формируется при добавлении TODO элемента
//   name: 'Learn JS', // Название задачи
//   done: true/false // Статус. По умолчанию false
// }

// При загрузке страницы мы должны доставать все значения из localstorage
// выводить их в html и добавлять обработчики

// Функция для формирования уникального идентификатора
function generateUniqID() {
  return Math.random().toString(36).substr(2, 9);
}

const LS_KEY = 'TODOS';

(() => {
  if(!Array.isArray(JSON.parse(localStorage.getItem(LS_KEY)))) {
    localStorage.setItem(LS_KEY, JSON.stringify([]))
  }
})()

const addTodoInput = document.querySelector('.add-todo-input');
const addTodoButton = document.querySelector('.add-todo-button');
const todoList = document.querySelector('.list');
const sectionWhithElem = document.querySelector('.hidden')  //2-й глав div

function getItemLS(){
  const items = JSON.parse(localStorage.getItem(LS_KEY));
  return items;
}

const items = getItemLS();

items.forEach(k =>{
      todoList.insertAdjacentHTML('afterbegin', getTodoHTML(k));
})

function LS_setItem(t){
  localStorage.setItem(LS_KEY, JSON.stringify([t,...items]));
}

function getTodoHTML({ id, name, done }) { //вызов по  кнопке "добавить"
  return `
  <div class="element" data-id="${id}">
    <div class="todo">
        <label class="checkbox">
        <input type="checkbox" class="input" ${done ? 'checked' : ''}/>
          <div class="checkbox-icon"></div>
        </label>
        <span class="text">${name}</span>
        <button class="negative ui button">Удалить</button>
        <button class="circular ui icon button button-edit ${done ? "hidden" : ""}">
          <i class="icon cog"></i>
        </button>
    </div>
    <div class="todo edit-name hidden">
        <div class="ui small input input-edit">
          <input type="text" class="edit-name-input" placeholder="Введите новое название...">
        </div>
        <button class="ui positive button small edit-save">Сохранить</button>
        <button class="ui button small">Отмена</button>
    </div>
  </div>
  `
}

const element = document.querySelectorAll('.element');

addTodoButton.addEventListener('click', () => {
  const todoName = addTodoInput.value;

  const todoItem = {
    id: generateUniqID(),
    name: todoName,
    done: false,
  }
  
  // sectionWhithElem.classList.remove('hidden')

  LS_setItem(todoItem)
  todoList.insertAdjacentHTML('afterbegin', getTodoHTML(todoItem));
  addTodoInput.value = "";
})

const falseTask = document.querySelector('.false-task');
const trueTask = document.querySelector('.true-task');

for (const elem of element){
  
  const buttonCheck = elem.querySelector('.checkbox');
  const buttonEdit = elem.querySelector('.button-edit');
  const editName = elem.querySelector('.edit-name');
  const checkboxItem = elem.querySelector('.input');
  const todo = elem.querySelector('.todo')

  elem.addEventListener('click', (e) =>{

    if(e.target.matches(".input")){
        const item = getItemLS();
        const elemID = e.target.closest('.element').dataset.id;
        item.forEach(i => {
          if(elemID == i.id){
          i.done = !i.done;
          console.log(Object.values(i));
          } 
        })
        localStorage.setItem(LS_KEY, JSON.stringify([...item]))

        buttonCheck.addEventListener('change',(event) => {
          if(checkboxItem.checked){
            elem.classList.add('todo--active');
            buttonEdit.classList.add('hidden');
            console.log('true')
           } else {
            elem.classList.remove('todo--active');
            buttonEdit.classList.remove('hidden');
            console.log('false')
          }
      })
    }


    if(e.target.matches(".button-edit")){
      buttonEdit.addEventListener('click', (event) => {
        editName.classList.remove('hidden');
      })
    }

    const editInput = elem.querySelector('.edit-name-input');
    const editSave = elem.querySelector('.edit-save');

    function newName(){     //функция смены имени и записи его в LS - рабтает после обновы
      const elemID = e.target.closest('.element').dataset.id;
      const item = getItemLS();
        item.forEach(i => {
          if(elemID === i.id){
            i.name = editInput.value;
          }
          localStorage.setItem(LS_KEY, JSON.stringify([...item]))
        }) 
    }

    if(e.target.matches(".edit-save")){    //ивент сохранения значенияиз функции смены имени
      editSave.addEventListener('click', (event) => {
       const textName = elem.querySelector('.text')
       newName();
      })
    }
  })

            trueTask.addEventListener('click', (event)=>{
              if(elem.hasAttribute('.todo--active') == false){
                elem.classList.add('hidden');
                console.log(9)
                console.log(!elem.hasAttribute('.todo--active'))
              }else{
                console.log(99)
              }
            })

}