const addTaskBtn = document.querySelector(".add");
const uncompletedTaskList = document.querySelector(".uncompleted-task_list");
const completedTaskList = document.querySelector(".completed-task_list");
const taskInput = document.querySelector("input[type=text]");
const darkBtn = document.querySelector(".dark-btn");

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
    taskInput.focus();
    uncompletedToggle();
    checkDarkView();
  }
}

function deleteTask() {
  if (event.target.className === "delete") {
    const li = event.target.closest("li");
    li.remove();
    uncompletedToggle();
    completedToggle();
    spanToggle();
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
    completedToggle();
    uncompletedToggle();
    spanToggle();
  } else if (event.target.type === "checkbox" && !event.target.checked) {
    const li = event.target.closest("li");
    const span = li.querySelector("span");
    span.innerHTML = createDate();
    uncompletedTaskList.appendChild(li);
    completedToggle();
    uncompletedToggle();
  }
}

const uncompletedToggle = () => {
  const liTasks = uncompletedTaskList.getElementsByTagName("li");
  const uncompletedTask = document.querySelector(".uncompleted-task");
  const emptyList = uncompletedTask.querySelector(".empty-list");
  if (liTasks.length > 0) {
    emptyList.classList.add("hidden");
  } else if (liTasks.length <= 0) {
    emptyList.classList.remove("hidden");
  }
};

const completedToggle = () => {
  const liTasks = completedTaskList.getElementsByTagName("li");
  const completedTask = document.querySelector(".completed-task");
  const emptyList = completedTask.querySelector(".empty-list");
  if (liTasks.length > 0) {
    emptyList.classList.add("hidden");
  } else if (liTasks.length <= 0) {
    emptyList.classList.remove("hidden");
  }
};

const spanToggle = () => {
  const uncompletedTask = document.querySelector(".uncompleted-task");
  const unLiTasks = uncompletedTaskList.getElementsByTagName("li");
  const completedTask = document.querySelector(".completed-task");
  const liTasks = completedTask.getElementsByTagName("li");
  const emptyList = uncompletedTask.querySelector(".empty-list");

  if (unLiTasks.length <= 0 && liTasks.length > 0) {
    emptyList.innerHTML = "Вы всё выполнили";
  } else {
    emptyList.innerHTML = "Дел на сегодня нет";
  }
};

function createDate() {
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const arrDate = [month + 1, day, hours, minutes];
  const arrCreateDate = [];
  for (let i = 0; i < arrDate.length; i++) {
    if (arrDate[i] < 10) {
      arrCreateDate.push(`0${arrDate[i]}`);
    } else {
      arrCreateDate.push(arrDate[i]);
    }
  }
  return `${arrCreateDate[0]}.${arrCreateDate[1]}\n${arrCreateDate[2]}:${arrCreateDate[3]}`;
}

const getDarkTopic = () => {
  const body = document.querySelector("body");
  const h1 = document.querySelector("h1");
  const h2 = document.querySelectorAll("h2");
  body.classList.toggle("night");
  h1.classList.toggle("white-text");
  for (let i = 0; i < h2.length; i++) {
    h2[i].classList.toggle("white-text");
  }
  checkDarkView();
};

const checkDarkView = () => {
  const body = document.querySelector("body");
  const li = document.getElementsByTagName("li");
  const img = document.getElementsByTagName("img");
  for (let i = 0; i < li.length; i++) {
    if (body.classList.contains("night")) {
      li[i].classList.add("white-text");
    } else {
      li[i].classList.remove("white-text");
    }
  }
  for (let i = 0; i < img.length; i++) {
    if (body.classList.contains("night")) {
      img[i].classList.add("invert");
    } else {
      img[i].classList.remove("invert");
    }
  }
};

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keyup", (event) => {
  if (event.code === "Enter") addTask();
});

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
darkBtn.addEventListener("click", getDarkTopic);

darkBtn.addEventListener('click', () => {
  darkBtn.innerHTML === "Включи ночь"
  ? (darkBtn.innerHTML = "Включи свет")
  : (darkBtn.innerHTML = "Включи ночь");
})
