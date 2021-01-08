const input = document.querySelector('.create-todo__input')
const list = document.querySelector('.list')
const itemsLeft = document.querySelector('.items-left')
const clearCompleted = document.querySelector('.clear-completed')
const showCompleted = document.querySelector('.completed')
const showActive = document.querySelector('.active')
const showAll = document.querySelector('.all')
const toggleTheme = document.getElementById('theme-toggle')
const body = document.querySelector('.body')
const toggleImg = document.querySelector('.theme-image')

const mobileShowCompleted = document.querySelector('.mobile .completed')
const mobileShowActive = document.querySelector('.mobile .active')
const mobileShowAll = document.querySelector('.mobile .all')

// Set initial values
let listItems = [...list.children]
let completedItems = []
let completedItemsStorage = []
let items = []

// Add to completedItems Array
const checkCompleted = () => {
    completedItems = listItems.filter(item => {
        if(item.classList.contains('completed')) {
            completedItemsStorage.push(item.innerHTML)
            return item
        }
    })
    localStorage.setItem('completed', JSON.stringify(completedItemsStorage))
}

// Dragging function
const setDraggables = () => {
    return document.querySelectorAll('.draggable')
}

const setDragging = (draggables) => {
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging')
        })
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
        })
    })    
    
    list.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(list, e.clientY)
        const draggable = document.querySelector('.dragging')
        if(afterElement === undefined) {
            list.appendChild(draggable)
        } else {
            list.insertBefore(draggable, afterElement)
        }
        
    })
    
    function getDragAfterElement(list, y) {
        const listChildrenArray = Array.from(list.children)
        const draggableElements = listChildrenArray.filter(item => {
            return !item.classList.contains('dragging')
        })
    
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2 
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child}
            } else {
                return closest
            }
        }, { offset: Number.NEGATIVE_INFINITY}).element
    }
}



// New Task

const createNewItem = (input) => {
    items.push({name: input, completed: false})

    localStorage.setItem('items', JSON.stringify(items))

    let task = document.createElement('div')
    task.classList.add('task-container')
    task.classList.add('task')
    task.classList.add('draggable')
    task.draggable = true

    
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
    

    listItems.forEach((item) => {
        list.appendChild(item)
        if (listItems.length - completedItems.length === 1) {
            itemsLeft.innerHTML = `${listItems.length - completedItems.length} item left`
        } else {
            itemsLeft.innerHTML = `${listItems.length - completedItems.length} items left`
        }
    })


    // Add element specific delete button
    const delBtn = document.querySelectorAll('.task__delete')

    delBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            let index = listItems.indexOf(btn.parentNode)
            items.filter(item => {
                console.log(item)
                return !(item.name === btn.parentNode.childNodes[1].innerHTML)
            })
            // console.log(items)
            // console.log(items.find(item => item === btn.parentNode.childNodes[1].innerHTML))
            if(index > -1) {
                listItems[index].remove()
                listItems.splice(index, 1)
            }

            btn.parentNode.remove()
        })
    })

    let draggables = setDraggables()
    setDragging(draggables)

    
}

// Initial call to create tasks in storage
let parsedStorage = JSON.parse(localStorage.getItem('items'))

if(parsedStorage) {
    parsedStorage.forEach(item => {
        createNewItem(item.name)

    })
}

let draggables = setDraggables()
setDragging(draggables)


// List Filters
showAll.addEventListener('click', () => {
    if(!showAll.classList.contains('selected')) {
        showAll.classList.add('selected')
        showActive.classList.remove('selected')
        showCompleted.classList.remove('selected')
    }
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }

    listItems.forEach(item => {
            list.appendChild(item)
    })
})


showActive.addEventListener('click', () => {
    if(!showActive.classList.contains('selected')) {
        showActive.classList.add('selected')
        showAll.classList.remove('selected')
        showCompleted.classList.remove('selected')
    }
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
    if(!showCompleted.classList.contains('selected')) {
        showCompleted.classList.add('selected')
        showAll.classList.remove('selected')
        showActive.classList.remove('selected')
    }
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }

    completedItems.forEach(item => {
        list.appendChild(item)
    })
})


// Mobile Event Listeners

mobileShowAll.addEventListener('click', () => {
    if(!mobileShowAll.classList.contains('selected')) {
        mobileShowAll.classList.add('selected')
        mobileShowActive.classList.remove('selected')
        mobileShowCompleted.classList.remove('selected')
    }
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }

    listItems.forEach(item => {
            list.appendChild(item)
    })
})


mobileShowActive.addEventListener('click', () => {
    if(!mobileShowActive.classList.contains('selected')) {
        mobileShowActive.classList.add('selected')
        mobileShowAll.classList.remove('selected')
        mobileShowCompleted.classList.remove('selected')
    }
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }

    listItems.forEach(item => {
        if (!item.classList.contains('completed')) {
            list.appendChild(item)
        }
    })

})

mobileShowCompleted.addEventListener('click', () => {
    if(!mobileShowCompleted.classList.contains('selected')) {
        mobileShowCompleted.classList.add('selected')
        mobileShowAll.classList.remove('selected')
        mobileShowActive.classList.remove('selected')
    }
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }

    completedItems.forEach(item => {
        list.appendChild(item)
    })

})

// Delete all completed items

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
})


// Listen for enter keypress

input.addEventListener('keydown', (e) => {
    if(e.keyCode === 13) {
        e.preventDefault()
        createNewItem(e.target.value)
        e.target.value = ''
    }
})

// Change Theme

toggleTheme.addEventListener('change', () => {
    body.classList.toggle('dark')
    if(body.classList.contains('dark')) {
        toggleImg.src = './images/icon-moon.svg'
    } else {
        toggleImg.src = './images/icon-sun.svg'
    }
})







