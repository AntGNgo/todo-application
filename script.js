const input = document.querySelector('.create-todo__input')
const list = document.querySelector('.list')
const completedBtn = document.querySelector('.task__check')
const itemsLeft = document.querySelector('.items-left')


let listItems = [...list.children]
let completedItems = []

const checkCompleted = () => {
    completedItems = listItems.filter(item => {
        return item.classList.contains('completed')
    })
}


// New Task

const createNewItem = (input = "Study Development") => {
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

    task.addEventListener('click', () => {
        task.classList.toggle('completed')
        checkCompleted()
        console.log(completedItems.length)
        if(listItems.length - completedItems.length === 1) {
            itemsLeft.innerHTML = `${listItems.length - completedItems.length} item left`
        } else {
            itemsLeft.innerHTML = `${listItems.length - completedItems.length} items left`
        }        
    })

    listItems.push(task)

    listItems.forEach((item) => {
        list.appendChild(item)
        if (listItems.length - completedItems.length === 1) {
            itemsLeft.innerHTML = `${listItems.length - completedItems.length} item left`
        } else {
            itemsLeft.innerHTML = `${listItems.length - completedItems.length} items left`
        }
    })

}



input.addEventListener('keydown', (e) => {
    if(e.keyCode === 13) {
        createNewItem(e.target.value)
    }
})

createNewItem()