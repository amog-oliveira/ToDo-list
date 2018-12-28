var taskInput = document.getElementById("new-task");
var addButton = document.getElementById("save-button");
var showButton = document.getElementById("show-completed-tasks");
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");
var searchInput = document.getElementById("search-task");

var allTasks = document.getElementsByTagName("li")
if (allTasks.length == 0){
  searchInput.disabled = true
  searchInput.placeholder = "Não há tarefas ainda :("
}

var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input"); 
  var label = document.createElement("label");
  checkBox.type = "checkbox";  
  label.innerText = taskString;
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  return listItem;
}


var addTask = function(event){
  console.log("Add task...");
  if(taskInput.value === ""){
    alert("Task cannot be empty!")
  } 
  else {
    var listItem = createNewTaskElement(taskInput.value);
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);  
    taskInput.value = "";
    searchInput.disabled = false
    searchInput.placeholder = "Buscar tarefa ..."
  }
}


var taskCompleted = function() {
  console.log("Task complete...");  
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete = function() {
  console.log("Task Incomplete...");
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  checkBox.onchange = checkBoxEventHandler;
}

var showCompletedTasks = function(){
  console.log("Show completed tasks ...")
  if (completedTasksHolder.style.display === "" || completedTasksHolder.style.display === "none"){
    completedTasksHolder.style.display = "block";
  } else {
    completedTasksHolder.style.display = "none";
  }
}

function enterClick(event){
  event.preventDefault();
  if(event.keyCode === 13){
    addButton.click();
  }
}

function searchTasks(){
  var filter, i, txt;
  filter = searchInput.value.toLowerCase();
  for(i = 0; i < allTasks.length; i++){
    txt = allTasks[i].innerText;
    if(txt.toLowerCase().indexOf(filter) > -1){
      completedTasksHolder.style.display = "block"
      allTasks[i].style.display = "";
    } else {
      allTasks[i].style.display = "none";
    }
  }
  if(filter ===''){
    completedTasksHolder.style.display = "none"
  }
}

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keyup", enterClick);
showButton.addEventListener("click", showCompletedTasks);


for(var i = 0; i <  incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for(var i = 0; i <  completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete); 

}
