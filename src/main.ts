import './style.css';

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

let todos: Todo[];

const todoContainer = document.querySelector(".todo-container") as HTMLDivElement;
const todoInput = document.getElementById("todo-title") as HTMLInputElement;
const myForm = document.getElementById("form") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random()*1000)
  }

  todos.push(todo);
  todoInput.value = "";
  
  renderTodos(todos);
  console.log(todos)
}

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo:HTMLDivElement = document.createElement("div");
  todo.className = "todo";

  // Creating a checkbox
  const checkBox:HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox"); 
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find(item => {
      if(item.id === id) item.isCompleted = checkBox.checked;
    })
    paragraph.className = checkBox.checked ? "text-cut" : "";
    setTodos(todos);
  }
  
  // Creating p for title
  const paragraph:HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;
  paragraph.className = isCompleted ? "text-cut" : "";

  // Creating p for title
  const deleteBtn:HTMLButtonElement = document.createElement("button");
  deleteBtn.innerHTML = "&#10060;";
  deleteBtn.className = "deleteBtn";
  deleteBtn.onclick = () => {
    deleteTodo(id);
    renderTodos(todos);
    setTodos(todos);
  }

  // Appending all to 'todo' element
  todo.append(checkBox, paragraph, deleteBtn);
  todoContainer.append(todo);
}

const deleteTodo = (id: string) => {
  const todoIndex = todos.findIndex((item) => item.id === id);
  todos.splice(todoIndex, 1);
  setTodos(todos);
}

const renderTodos = (todos: Todo[]) => {
  todoContainer.innerText = "";
  todos.forEach(item=>{
    const { title, isCompleted, id } = item;
    generateTodoItem(title, isCompleted, id);
  })
  setTodos(todos);
}

// To save the data in localStorage
const setTodos = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to retrieve todos data from localStorage
const getTodos = (): Todo[] => {
  const todosJSON = localStorage.getItem('todos');
  if (todosJSON) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
}

todos = getTodos();
renderTodos(todos);