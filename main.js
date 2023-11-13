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
  const spanDate = document.createElement("span");

  checkBox.type = "checkBox";
  input.type = "text";
  imgEdit.src = "./icons/edit.png";
  imgEdit.type = "image";
  imgDelete.src = "./icons/delete.png";
  imgDelete.type = "image";

  deleteButton.className = "delete";
  editButton.className = "edit";
  buttons.className = "buttons";
  spanDate.className = "date";

  label.innerText = taskValue;
  spanDate.innerHTML = createDate();

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(input);
  listItem.appendChild(buttons);
  buttons.appendChild(editButton);
  buttons.appendChild(deleteButton);
  editButton.appendChild(imgEdit);
  deleteButton.appendChild(imgDelete);
  listItem.appendChild(spanDate);

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
  const span = li.querySelector("span");
  const labelTrue = li.classList.contains("editMode");

  if (labelTrue) {
    label.innerHTML = input.value;
    span.innerHTML = createDate();
  } else {
    input.value = label.innerHTML;
  }
  li.classList.toggle("editMode");
}

function checkBox() {
  if (event.target.type === "checkbox" && event.target.checked) {
    const li = event.target.closest("li");
    const span = li.querySelector("span");
    span.innerHTML = createDate();
    completedTaskList.appendChild(li);
  } else if (event.target.type === "checkbox" && !event.target.checked) {
    const li = event.target.closest("li");
    const span = li.querySelector("span");
    span.innerHTML = createDate();
    uncompletedTaskList.appendChild(li);
  }
}

function createDate() {
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const arrDate = [month + 1, day, hours, minutes];
  let arrTwo = [];
  for (let i = 0; i < arrDate.length; i++) {
    if (arrDate[i] < 10) {
      arrTwo.push(`0${arrDate[i]}`);
    } else {
      arrTwo.push(arrDate[i]);
    }
  }
  return `${arrTwo[0]}.${arrTwo[1]}\n${arrTwo[2]}:${arrTwo[3]}`;
}

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
completedTaskList.addEventListener("click", checkBox);
