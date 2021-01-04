const input = document.querySelector('.create-todo__input')
const list = document.querySelector('.list')
const completedBtn = document.querySelector('.task__check')


const listItems = [...list.children]

// New Task
const createNewItem = (input = "Study Developement") => {
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
    
    listItems.push(task)

    listItems.forEach((item) => {
        list.appendChild(item)
    })
    addEventOnNew()
}

const addEventOnNew = () => {
    listItems.forEach(item => {
        item.addEventListener('click', () => {
            console.log('hello')
            item.classList.toggle('completed')
        })
    })
}

input.addEventListener('keydown', (e) => {
    if(e.keyCode === 13) {
        createNewItem(e.target.value)
    }
})

createNewItem()