let todoItems = [];

class ToDo {
    constructor (text) {
        this.index = todoItems.length + 1;
        this.checked = false;

        this.node = document.createElement("li");
        this.node.classList.add("todo-app__item");  
        this.node.innerHTML= `
            <div class="todo-app__checkbox">
                <input type="checkbox" id=${this.index}>
                <label for=${this.index}></label>
            </div>
            <h1 class="todo-app__item-detail">
                ${text}
            </h1>
            <img src="./img/x.png" class="todo-app__item-x">`      
    }
    changeStatus () {
        if (this.checked === false) {
            this.node.innerHTML= `
            <div class="todo-app__checkbox">
                <input type="checkbox" id=${this.index}>
                <label for=${this.index}></label>
            </div>
            <h1 class="todo-app__item-detail">
                <label>${text}</label>
            </h1>
            <img src="./img/x.png" class="todo-app__item-x">`  
            this.checked = true;
        }
        if (this.checked === true) {
            this.node.innerHTML= `
            <div class="todo-app__checkbox">
                <input type="checkbox" id=${this.index}>
                <label for=${this.index}></label>
            </div>
            <h1 class="todo-app__item-detail">
                ${text}
            </h1>
            <img src="./img/x.png" class="todo-app__item-x">`  
            this.checked = false;
        }
    }

    get Node () {
        return this.node;
    }
}

let listNode = document.getElementById("todo-list");
let inputNode = document.getElementsByClassName("todo-app__input")[0];

inputNode.addEventListener(
    'keypress', 
    function (event) {
    if (event.keyCode === 13) {
      const inputValue = inputNode.value;
      let newNode = new ToDo(inputValue).Node;

      todoItems.push(newNode);
      listNode.appendChild(newNode);

      // clear input column
      inputNode.value = '';
    }
  });

// change done status
document.querySelector('.todo-app__list').addEventListener(
    'click', 
    function (event) {
    const target = event.target;

    if (target.parentNode.classList.contains("todo-app__checkbox")) {
        console.log(target.parentNode.classList);
        var element = document.getElementsByClassName("todo-app__item-detail")[0];
        console.log(element.classList);
        element.classList.add("text_done_style");
        // element.classList.remove("text_done_style");
    }
  });


// functions
function renderTodo (todoItems) {
    for (let i = 0; i < todoItems.length; i++) {
        listNode.appendChild(todoItems[i].Node);
    }
  }

//function addTodo ()
  