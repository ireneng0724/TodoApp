document.addEventListener("DOMContentLoaded", function() { 
    let todoForm = document.getElementById("newTodoForm");
    let todoList = document.getElementById("todoList");
    
    let todoArray = getLocalStorage("taskName");
    
    todoArray.forEach(function(todo) {
        createDOMElement(todoList, todo);
    });

    todoForm.addEventListener("submit", function(event){
        event.preventDefault();

        let removeButton = document.createElement("button");
        removeButton.innerText = "X";

        let space = document.createElement("span");
        space.innerText = " ";

        let newTodo = document.createElement("li");     
        let taskName = document.getElementById("task").value;
        newTodo.innerText = taskName;
        
        todoArray.push(taskName);
        
        saveToLocalStorage("taskName", todoArray);

        todoList.appendChild(newTodo);
        newTodo.appendChild(space);
        newTodo.appendChild(removeButton);

        todoForm.reset();
    });

    todoList.addEventListener("click", function(event){
        const target = event.target;
        const targetTagToLowerCase = target.tagName.toLowerCase();
        

        if (targetTagToLowerCase === "li"){
            event.target.style.textDecoration = "line-through";
        } else if (targetTagToLowerCase === "button") {
            const todo = target.parentElement.firstChild.textContent;
            let todos = getLocalStorage("taskName");
            const targetIndex = todos.indexOf(todo);
            todos.splice(targetIndex, 1);
            saveToLocalStorage("taskName", todos);
            event.target.parentNode.remove();
        }
    });
});

function saveToLocalStorage(key, value){
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
}

function getLocalStorage(key){
    const jsonValue = localStorage.getItem(key);
    if (jsonValue === ""){
        return [];
    } else {
         return JSON.parse(jsonValue);   
    }
}

function createDOMElement(parent, text){
    let newEl = document.createElement("li");
    newEl.innerText = text;
    parent.appendChild(newEl);
   
    let remove = document.createElement("button");
    remove.innerText = "X";

    let space = document.createElement("span");
        space.innerText = " ";

    let spaces = document.createElement("span");
    spaces.innerText = " ";

    newEl.appendChild(spaces);
    newEl.appendChild(remove);
}