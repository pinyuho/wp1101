let todoItems = [];
const list = document.querySelector('.todo-app__list');
const main = document.querySelector('.todo-app__main');

function addTodo(text) {
    const todo = {
      text,
      checked: false,
      id: Date.now(),
    };
  
    todoItems.push(todo);
    renderTodo(todo);
    // console.log(todoItems);
  }

// Select the form element
let inputNode = document.getElementsByClassName("todo-app__input")[0];

inputNode.addEventListener(
    'keypress', 
    function (event) {
    if (event.keyCode === 13) {
        const inputValue = inputNode.value;
        addTodo(inputValue);
        // clear input column
        inputNode.value = '';
    }
  });

function renderTodo(todo) {
    const isChecked = todo.checked ? 'done': '';
    const item = document.querySelector(`[id='${todo.id}']`);

    const node = document.createElement("li");
    node.classList.add("todo-app__item");
    if (!isChecked) {
        node.innerHTML= `
        <div class="todo-app__checkbox">
            <input type="checkbox" id=${todo.id}>
            <label for=${todo.id}></label>
        </div>
        <h1 class="todo-app__item-detail">
            ${todo.text}
        </h1>
        <img src="./img/x.png" class="todo-app__item-x">`   
    } else {
        node.innerHTML= `
        <div class="todo-app__checkbox">
            <input type="checkbox" id=${todo.id}>
            <label for=${todo.id}></label>
        </div>
        <h1 class="todo-app__item-detail">
            <label>${todo.text}</label>
        </h1>
        <img src="./img/x.png" class="todo-app__item-x">` 
    }
    
    if (item) {
    // replace it
    list.replaceChild(node, item);
    } else {
    list.append(node);
    }

    let footer = document.createElement("footer");
    footer.classList.add("todo-app__footer"); 
    footer.id = "todo-footer";
    footer.innerHTML = `
        <div class="todo-app__total"> ${todoItems.length} left </div>
        <ul class="todo-app__view-buttons">
            <button> All </button>
            <button> Active </button>
            <button> Completed </button>
        </ul>

        <div class="todo-app__clean"> 
            <button> Clear Completed </button>
        </div>
    `
    main.append(footer);
}

list.addEventListener('click', event => {
    if (event.target.parentNode.classList.contains('todo-app__checkbox')) {
        console.log(event.target.id);
        // const itemKey = event.target.id;
        // console.log("itemkey");
        // console.log(event.target.id);
        // toggleDone(Number(event.parentNode.target.id));

    }
  });

function toggleDone(itemKey) {
    // console.log(itemKey);
    let index = -1;
    for (let i = 0; i < todoItems.length; i++) {
        if (todoItems[i].id == itemKey) {
            index = i;
        }
    }
    // console.log(index);
    todoItems[index].checked = !todoItems[index].checked;
    // renderTodo(todoItems[index]);
}


  