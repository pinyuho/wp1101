let todoItems = [];

class ToDo {
    constructor (text) {
        this.index = todoItems.length + 1;

        this.node = document.createElement("li");
        this.node.className = "todo-app__item";

        let checkNode = document.createElement("div");
        checkNode.className = "todo-app__checkbox";

        let checkboxInput = document.createElement("input");
        checkboxInput.type = "checkbox";
        checkboxInput.id = this.index;
        checkNode.appendChild(checkboxInput);
        let checkboxLabel = document.createElement("label");
        checkboxLabel.htmlFor = this.index;
        checkNode.appendChild(checkboxLabel);
        this.node.appendChild(checkNode);

        let detailNode = document.createElement("h1");
        detailNode.className = "todo-app__item-detail";
        detailNode.textContent = text;
        this.node.appendChild(detailNode);

        let imgNode = document.createElement('img');
        imgNode.src = "./img/x.png";
        imgNode.className = "todo-app__item-x";
        this.node.appendChild(imgNode);
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
    }
  });

const list = document.querySelector('.todo-app__list');
list.addEventListener(
    'click', 
    function (event) {
    const target = event.target;
    console.log("here1");
    console.log(target.classList);
    // check / uncheck todo
    if (target.classList.contains("todo-app__checkbox")) {
      console.log("here");
      console.log(target);
    }
  });