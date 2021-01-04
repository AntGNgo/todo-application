const input = document.querySelector('.create-todo__input')
const list = document.querySelector('.list')
// const completedBtn = document.querySelector('.task__check')
const itemsLeft = document.querySelector('.items-left')
const clearCompleted = document.querySelector('.clear-completed')
const showCompleted = document.querySelector('.completed')
const showActive = document.querySelector('.active')
const showAll = document.querySelector('.all')


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

    let del = document.createElement('div')
    del.classList.add('task__delete')

    task.appendChild(circle)
    task.appendChild(taskName)
    task.appendChild(del)

    task.addEventListener('click', () => {
        task.classList.toggle('completed')
        checkCompleted()
        if(listItems.length - completedItems.length === 1) {
            itemsLeft.innerHTML = `${listItems.length - completedItems.length} item left`
        } else {
            itemsLeft.innerHTML = `${listItems.length - completedItems.length} items left`
        }        
    })

    listItems.push(task)

    // Add items to list to render in HTML

    listItems.forEach((item) => {
        list.appendChild(item)
        if (listItems.length - completedItems.length === 1) {
            itemsLeft.innerHTML = `${listItems.length - completedItems.length} item left`
        } else {
            itemsLeft.innerHTML = `${listItems.length - completedItems.length} items left`
        }
    })

    
    // let remove = function() {
    //     this.parentNode.remove()
    // }

    // for(let i=0; i < delBtn.length; i++) {
    //     console.log(delBtn)
    //     delBtn[i].addEventListener('click', remove)
    // }
    const delBtn = document.querySelectorAll('.task__delete')

    delBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            let index = listItems.indexOf(btn.parentNode)
            if(index > -1) {
                listItems[index].remove()
                listItems.splice(index, 1)
            }

            btn.parentNode.remove()
        })
    })
    
}

showAll.addEventListener('click', () => {
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }

    listItems.forEach(item => {
            list.appendChild(item)
    })
})


showActive.addEventListener('click', () => {
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }

    listItems.forEach(item => {
        if (!item.classList.contains('completed')) {
            list.appendChild(item)
        }
    })

})


showCompleted.addEventListener('click', () => {
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }

    completedItems.forEach(item => {
        list.appendChild(item)
    })

})



clearCompleted.addEventListener('click', (e) => {
    for(let i=listItems.length-1; i>=0; i--) {
        if(listItems[i].classList.contains('completed')) {
            let index = listItems.indexOf(listItems[i])
            if(index > -1) {
                listItems[i].remove()
                listItems.splice(index, 1)
            }
        }
    }
    console.log(listItems)
})



input.addEventListener('keydown', (e) => {
    if(e.keyCode === 13) {
        e.preventDefault()
        createNewItem(e.target.value)
        e.target.value = ''
    }
})

createNewItem()