document.addEventListener('DOMContentLoaded',()=>{
    const todoInput = document.getElementById('todo-input');
    const addTaskButton = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [] // check local storage first

    tasks.forEach(task => renderTask(task));

    addTaskButton.addEventListener('click',()=>{
        const taskTest = todoInput.value.trim()
        if (taskTest === ""){
            return;
        }

        const newTask = {
            id:Date.now(),
            text:taskTest,
            completed:false
        }
        tasks.push(newTask) // Add the newTask into the list
        saveTask(tasks); // Update the new tasks list
        renderTask(newTask) // Render the newTask
        todoInput.value = "" //clear input
    });
    function renderTask(task){
        const li = document.createElement('li') // create new list element

        li.setAttribute('data-id',task.id) // set id for list element
        li.innerHTML = ` 
        <span>${task.text}</span>
        <button>delete</button>`
        
        if (task.completed){ // if the task is completed then list element should have class 'completed'
            li.classList.add('completed');
        }
        
        // Event listener for li except the delete button
        li.addEventListener('click',(event)=>{
            if(event.target.tagName === "BUTTON") return;
            task.completed = !task.completed // change the status of completed for task
            li.classList.toggle('completed') // Change the status of completed for li
            saveTask(); // save the changes in the local storage
        })
        
        // Event listener for delete button
        li.querySelector('button').addEventListener('click',(event)=>{
            event.stopPropagation() // To prevent toggle event from firing

            tasks = tasks.filter(t => t.id !== task.id ) // return the tasks array without the current task

            li.remove();
            saveTask();

        })
        
        todoList.appendChild(li) // add the list element to the todoList
    }
    // function to save and update the list in localStorage
    function saveTask(){
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
})