const input = document.querySelector('.create-todo__input')
const list = document.querySelector('.list')

const createNewItem = (input) => {
    let task = document.createElement('div')
    task.classList.add('task-container')
    task.classList.add('task')
    
    let circle = document.createElement('div')
    circle.classList.add('task__check')
    
    let taskName = document.createElement('p') 
    taskName.classList.add('task__name')
    
    let taskInput = document.createTextNode(input)
    taskName.appendChild(taskInput)

    task.appendChild(circle)
    task.appendChild(taskName)

    list.appendChild(task)

}

input.addEventListener('keydown', (e) => {
    if(e.keyCode === 13) {
        createNewItem(e.target.value)
    }
})