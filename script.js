const input = document.querySelector('.create-todo__input')
const list = document.querySelector('.list')
const completedBtn = document.querySelector('.task__check')
const itemsLeft = document.querySelector('.items-left')


const listItems = [...list.children]

// New Task

// const addEventOnNew = () => {
//     listItems.forEach(item => {
//         item.addEventListener('click', () => {
//             item.classList.toggle('completed')
//         })
//     })
// }

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
    })
    
    listItems.push(task)

    listItems.forEach((item) => {
        list.appendChild(item)
    })

    // addEventOnNew()

    if(listItems.length === 1) {
        itemsLeft.innerHTML = `${listItems.length} item left`
    } else {
        itemsLeft.innerHTML = `${listItems.length} items left`
    }
}



input.addEventListener('keydown', (e) => {
    if(e.keyCode === 13) {
        createNewItem(e.target.value)
    }
})

createNewItem()