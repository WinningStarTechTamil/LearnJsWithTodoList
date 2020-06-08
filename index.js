const inputBox = document.getElementById("inputBox");
let taskArr = [];
getTasks();

inputBox.focus();

inputBox.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    addTask();
  }
});

function addTask() {
  let taskValue = inputBox.value;
  let taskId = taskArr.length;

  let bool =
    taskValue.trim().length > 0 && taskValue.replace(/\s+/g, "").length > 0;

  if (bool) {
    taskArr.push({
      id: taskId,
      value: taskValue,
      completed: false,
    });
    setTasks();
    createTask(taskValue, taskId, false);

    inputBox.value = "";
    inputBox.focus();
  } else {
    alert("Please enter valid task!");
    inputBox.value = "";
  }
}

// function consoleArr() {
//   console.log(taskArr);
// }

function createTask(value, id, completed) {
  let newDiv = document.createElement("div");
  newDiv.textContent = value;

  newDiv.setAttribute("class", "listItem");

  if (completed) {
    newDiv.setAttribute("class", "listItem finished");
  }
  newDiv.setAttribute("id", id);

  newDiv.onclick = function () {
    let taskId = this.id;
    let newArr = [];
    this.classList.toggle("finished");
    for (let i = 0; i < taskArr.length; i++) {
      if (taskId.toString() === taskArr[i].id.toString()) {
        taskArr[i].completed = !taskArr[i].completed;
      }
      newArr.push(taskArr[i]);
    }

    taskArr = newArr;
    setTasks();
  };

  newDiv.ondblclick = function () {
    if (this.classList.length > 1) {
      let newArr = [];
      for (let i = 0; i < taskArr.length; i++) {
        let taskId = this.getAttribute("id");
        if (taskArr[i].id.toString() !== taskId.toString()) {
          newArr.push(taskArr[i]);
        }
      }
      taskArr = newArr;
      setTasks();
      this.remove();
    }
  };

  document.getElementsByClassName("listContainer")[0].appendChild(newDiv);
}

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem("todoList"));
  if (tasks !== null) {
    for (let i = 0; i < tasks.length; i++) {
      taskArr.push(tasks[i]);
      createTask(tasks[i].value, tasks[i].id, tasks[i].completed);
    }
  }
}

function setTasks() {
  localStorage.setItem("todoList", JSON.stringify(taskArr));
}
