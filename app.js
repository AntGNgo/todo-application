// Get Inital State
const getState = () => {
    if(localStorage.getItem('items') !== null) {
        const state = JSON.parse(localStorage.getItem("items"))
        return state
    } else {
        return []
    }
}

// Add to state
const appendState = (newTask) => {
    const currentState = getState()
    const newState = currentState.push(newTask)
    localStorage.setItem('items', JSON.stringify(newState))
}

// createNewTask

const createNewTask = () => {
    const input = document.querySelector('.create-todo__input')
    input.addEventListener('keydown', (e) => {
        if(e.keyCode === 13) {
            e.preventDefault()
            let task = {
                title: e.target.value,
                completed: false
            }
            e.target.value = ''
            appendState(task)
            const element = createDomElement(task)
            
        }
    })
}

// Create DOM Element to append

const createDomElement = ({ title }) => {
    let task = document.createElement('div')
    task.classList.add('task-container')
    task.classList.add('task')
    task.classList.add('draggable')
    task.draggable = true

    
    let circle = document.createElement('div')
    circle.classList.add('task__check')
    
    let taskName = document.createElement('p') 
    taskName.classList.add('task__name')
    
    let taskInput = document.createTextNode(title)
    taskName.appendChild(taskInput)

    let del = document.createElement('div')
    del.classList.add('task__delete')

    task.appendChild(circle)
    task.appendChild(taskName)
    task.appendChild(del)

    addEvtListeners(task)
    
    return task
    
}

// Toggle completed event listener
// TODO make delete its own event listener to work with the state might make another function just for deleting from state

const addEvtListeners = (task) => {
    setCompleteToggle(task)
    setDeleteBtns(task)
    setDragging()
}

const setCompleteToggle = (task) => {
    task.addEventListener('click', () => {
        if(!task.completed) {
            task.completed = true
            task.classList.add('completed')
        } else {
            task.completed = false
            task.classList.remove('completed')
        }
    })
}


const setDeleteBtns = (task) => {
    const delBtn = task.querySelector('.task__delete')
    // Add element specific delete button
    // local Storage also get updated because of the completion event listener. When deleted the item completion event handler runs.
        delBtn.addEventListener('click', () => {
            let stateIndex = listState.indexOf(input)
            if (stateIndex > -1) {
                listState.splice(stateIndex, 1)
            }
            let index = Object.values(listRender)
            console.log(index.filter(node => node == delBtn.parentNode))
            if(index > -1) {
                listRender[index].remove()
                listRender.splice(index, 1)
            }
            delBtn.parentNode.remove()
        })
}


const setDragging = () => {
    const draggables = document.querySelectorAll('.draggable')
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging')
        })
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
        })
    })    

    const list = document.querySelector('.list')
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