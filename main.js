
const addTaskBtn = document.querySelector(".add");
const uncompletedTaskList = document.querySelector(".uncompleted-task_list");
const completedTaskList = document.querySelector(".completed-task_list");
const taskInput = document.querySelector("input[type=text]");

function createNewTask(taskValue) {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const buttons = document.createElement("div");
  const editButton = document.createElement("button");
  const imgEdit = document.createElement("img");
  const deleteButton = document.createElement("button");
  const imgDelete = document.createElement("img");

  checkBox.type = "checkBox";
  input.type = "text";
  imgEdit.src = "./icons/edit.png";
  imgEdit.type = "image";
  imgDelete.src = "./icons/delete.png";
  imgDelete.type = "image";

  deleteButton.className = "delete new";
  editButton.className = "edit new";
  buttons.className = "buttons";

  label.innerText = taskValue;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(input);
  listItem.appendChild(buttons);
  buttons.appendChild(editButton);
  buttons.appendChild(deleteButton);
  editButton.appendChild(imgEdit);
  deleteButton.appendChild(imgDelete);

  return listItem;
}

function addTask() {
  if (taskInput.value != "") {
    const listItem = createNewTask(taskInput.value);
    uncompletedTaskList.appendChild(listItem);
    taskInput.value = "";
  }
}

function deleteTask() {
  if (event.target.className === "delete") {
    const li = event.target.closest("li");
    li.remove();
  }
}

function editTask() {
  const li = event.target.closest("li");
  const input = li.querySelector("input[type=text]");
  const label = li.querySelector("label");
  const labelTrue = li.classList.contains("editMode");

  if (labelTrue) {
    label.innerHTML = input.value;
  } else {
    input.value = label.innerHTML;
  }
  li.classList.toggle("editMode");
}

function checkBox() {
  if (event.target.type === "checkbox" && event.target.checked) {
    const li = event.target.closest("li");
    completedTaskList.appendChild(li);
    
  } if(event.target.type === 'checkbox' && !event.target.checked) {
    const li = event.target.closest('li')
    uncompletedTaskList.appendChild(li)
  }
}

// function editTask() {
//   if (event.target.className === "edit") {
//     const li = event.target.closest("li");
//     const input = li.querySelector("input[type=text]");
//     const label = li.querySelector("label");
//     li.classList.toggle('editMode')
//     const labelTrue = label.classList.contains("editMode")
//   }
// }

// function editTask () {
//     if (event.target.className === 'edit') {
//         const li = event.target.closest('li')
//         const label = li.querySelector('label')
//         label.setAttribute('contentEditable', true)
//     }
// }

addTaskBtn.addEventListener("click", addTask);
uncompletedTaskList.addEventListener("click", deleteTask);
completedTaskList.addEventListener("click", deleteTask);
uncompletedTaskList.addEventListener("click", () => {
  if (event.target.className === "edit") {
    editTask();
  }
});

completedTaskList.addEventListener("click", () => {
  if (event.target.className === "edit") {
    editTask();
  }
});

uncompletedTaskList.addEventListener("click", checkBox);
completedTaskList.addEventListener('click', checkBox)