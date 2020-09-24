//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
//event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo);
//functions and voids
function addTodo(event){
    event.preventDefault();
    
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    saveLocalTodos(todoInput.value);
    
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //CHECK trash BUTTON
    const trashButton = document.createElement("button")
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    if(item.classList[0] === "trash-btn"){
        
        const test = item.parentElement;
        test.classList.add("fall");
        removeLocalTodos(test);
        test.addEventListener("transitionend", function() {
            test.remove();
        });
    }
    if(item.classList[0] === "complete-btn"){
        
        const test = item.parentElement;
        test.classList.toggle("complete");
    }
    
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(test) {
        switch(e.target.value) {
            case "all":
                test.style.display = "flex";
                break;
            case "completed":
                if(test.classList.contains("complete")) {
                    test.style.display = "flex";
                } else {
                    test.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!test.classList.contains("complete")) {
                    test.style.display = "flex";
                } else {
                    test.style.display = "none";
                }
                break;
                
                
                
            
        }
    });
}


function saveLocalTodos(todo){
    //CHECK- Do i have stuff in
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
        //whatever is there take it back and put in
        //array
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    //pushing to local storage
    //stringifying it
}

function getTodos(){
    
    //CHECK
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
        //whatever is there take it back and put in
        //array
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        
        
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
    
        //CHECK trash BUTTON
        const trashButton = document.createElement("button")
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    //CHECK
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
        //whatever is there take it back and put in
        //array
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));

}

