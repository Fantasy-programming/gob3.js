// State of the app

const todos = ["Do this with that", "walk the dog", "Sand the chainana"];

// REference to html element

const addTodoInput = document.getElementById("todo-input");
const addToDoButton = document.getElementById("add-todo-btn");
const todosList = document.getElementById("todos-list");

// Intialize the view

for (const todo of todos) {
  todosList.append(renderTodoInReadMode(todo));
}

// Event listeners

addTodoInput.addEventListener("input", () => {
  addToDoButton.disabled = addTodoInput.value.lenght < 3;
});

addTodoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && addTodoInput.value.length >= 3) {
    addTodo();
  }
});

addToDoButton.addEventListener("click", () => {
  addTodo();
});

// Functions

function renderTodoInReadMode(todo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");

  span.textContent = todo;
  button.textContent = "Done";

  span.addEventListener("dblclick", () => {
    const index = todos.indexOf(todo);
    todosList.replaceChild(
      renderTodoInEditMode(todo),
      todosList.childNodes[index],
    );
  });

  button.addEventListener("click", () => {
    const index = todos.indexOf(todo);
    removeTodo(index);
  });

  li.append(span, button);
  return li;
}

function renderTodoInEditMode(todo) {
  const li = document.createElement("li");
  const input = document.createElement("input");
  const saveBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");
  const container = document.createElement("div");

  input.value = todo;
  input.type = "text";
  saveBtn.textContent = "Save";
  cancelBtn.textContent = "Cancel";

  saveBtn.addEventListener("click", () => {
    const index = todos.indexOf(todo);
    updateTodo(index, input.value);
  });

  cancelBtn.addEventListener("click", () => {
    const index = todos.indexOf(todo);
    todosList.replaceChild(
      renderTodoInReadMode(todo),
      todosList.childNodes[index],
    );
  });

  container.append(saveBtn, cancelBtn);
  li.append(input, container);

  return li;
}

function addTodo() {
  const description = addTodoInput.value;

  if (chectodoExists(description)) {
    addTodoInput.value = "";
    return alert("Todo already exists");
  }

  todos.push(description);

  const newTodo = renderTodoInReadMode(description);
  const utterance = new SpeechSynthesisUtterance(description);

  todosList.append(newTodo);
  speechSynthesis.speak(utterance);

  addTodoInput.value = "";
  addToDoButton.disabled = true;
}

function removeTodo(index) {
  const todo = todosList.childNodes[index];
  const span = todo.querySelector("span");
  span.classList.toggle("striked");
  // todos.splice(index, 1);
  // todosList.childNodes[index].remove();
}

function updateTodo(index, description) {
  todos[index] = description;
  const newTodo = renderTodoInReadMode(description);
  todosList.replaceChild(newTodo, todosList.childNodes[index]);
}

function chectodoExists(description) {
  return todos.includes(description);
}
