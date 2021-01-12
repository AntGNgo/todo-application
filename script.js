

// const itemsLeft = document.querySelector('.items-left')

// const showCompleted = document.querySelector('.completed')
// const showActive = document.querySelector('.active')
// const showAll = document.querySelector('.all')

// const body = document.querySelector('.body')


// const mobileShowCompleted = document.querySelector('.mobile .completed')
// const mobileShowActive = document.querySelector('.mobile .active')
// const mobileShowAll = document.querySelector('.mobile .all')

// Set initial values



// List State is just name of the task
// if (localStorage.getItem('items')) {
//     listState = JSON.parse(localStorage.getItem("items"))
// } else {
//     listState = []
// }

// List Render is the actual DOM Element that is stored


// const initialRender = (listArr) => {
//     const list = document.querySelector('.list')
//     listArr.forEach(item => {
//         let task = newTaskListener(item.name)
//         addEvtListeners(task)
//         list.appendChild(task)
//     })
// }


const createNewTaskListener = () => {
    const input = document.querySelector('.create-todo__input')
    input.addEventListener('keydown', (e) => {
        if(e.keyCode === 13) {
            e.preventDefault()
            const newItem = {
                title: e.target.value,
                completed: false
            }
            e.target.value = ''
            createNewTask(newItem)
        }
    })
} 


const getLocalStorage = () => {
    if(localStorage.getItem('items') !== null) {
        const state = JSON.parse(localStorage.getItem("items"))
        return state
    } else {
        return []
    }
}

const addToLocalStorage = (newTask) => {
    try {
        let currentlyStored = getLocalStorage()
        let updatedStored = currentlyStored.push(newTask)
        localStorage.setItem('items', JSON.stringify(updatedStored))
    } catch (error) {
        localStorage.setItem('item', JSON.stringify(newTask))
        
    }
}

const createNewTask = (task) => {
    addToLocalStorage(task)
    createDomElement(task.title)
}

const createDomElement = ({ name }) => {
    let task = document.createElement('div')
    task.classList.add('task-container')
    task.classList.add('task')
    task.classList.add('draggable')
    task.draggable = true

    
    let circle = document.createElement('div')
    circle.classList.add('task__check')
    
    let taskName = document.createElement('p') 
    taskName.classList.add('task__name')
    
    let taskInput = document.createTextNode(name)
    taskName.appendChild(taskInput)

    let del = document.createElement('div')
    del.classList.add('task__delete')

    task.appendChild(circle)
    task.appendChild(taskName)
    task.appendChild(del)

    addEvtListeners(task)
    
    renderNewTask(task)
}


// Dragging function

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

// Task Event Listeners

const addEvtListeners = (task) => {
    task.addEventListener('click', () => {
        if(!task.completed) {
            task.completed = true
            task.classList.add('completed')
        } else {
            task.completed = false
            task.classList.remove('completed')
        }
    })

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

    setDragging()
}



const renderNewTask = (task) => {
    const list = document.querySelector('.list')
    list.appendChild(task)
}


const initialRender = () => {
    let state = getLocalStorage()
    state.forEach(item => {
        renderNewTask(createDomElement(item))
    })
}

(() => {
    initialRender()
    createNewTaskListener()
})()




// Create an initial state
// Render whatever is returned from the initial state














// List Filters
// showAll.addEventListener('click', () => {
//     if(!showAll.classList.contains('selected')) {
//         showAll.classList.add('selected')
//         showActive.classList.remove('selected')
//         showCompleted.classList.remove('selected')
//     }

//     // listState.forEach(item => {
//     //     createDomElement(item)
//     // })
//     // setDragging()

    
// })


// showActive.addEventListener('click', () => {
//     if(!showActive.classList.contains('selected')) {
//         showActive.classList.add('selected')
//         showAll.classList.remove('selected')
//         showCompleted.classList.remove('selected')
//     }

//    console.log(list.children)

//    const listArr = Array.from(list.children)

// //    const filteredByActive =
    
// })


// showCompleted.addEventListener('click', () => {
//     if(!showCompleted.classList.contains('selected')) {
//         showCompleted.classList.add('selected')
//         showAll.classList.remove('selected')
//         showActive.classList.remove('selected')
//     }
   
// })


// Mobile Event Listeners



// mobileShowAll.addEventListener('click', () => {
//     if(!mobileShowAll.classList.contains('selected')) {
//         mobileShowAll.classList.add('selected')
//         mobileShowActive.classList.remove('selected')
//         mobileShowCompleted.classList.remove('selected')
//     }
    
// })


// mobileShowActive.addEventListener('click', () => {
//     if(!mobileShowActive.classList.contains('selected')) {
//         mobileShowActive.classList.add('selected')
//         mobileShowAll.classList.remove('selected')
//         mobileShowCompleted.classList.remove('selected')
//     }
   

// })

// mobileShowCompleted.addEventListener('click', () => {
//     if(!mobileShowCompleted.classList.contains('selected')) {
//         mobileShowCompleted.classList.add('selected')
//         mobileShowAll.classList.remove('selected')
//         mobileShowActive.classList.remove('selected')
//     }
    
// })

// Delete all completed items

// const clearCompletedListener = () => {
//     const clearCompleted = document.querySelector('.clear-completed')
//     clearCompleted.addEventListener('click', (e) => {
        
//     })
// }



// Listen for enter keypress



// Change Theme

// const toggleThemeListener = () => {
//     const toggleImg = document.querySelector('.theme-image')
//     const toggleTheme = document.getElementById('theme-toggle')
//     toggleTheme.addEventListener('change', () => {
//         body.classList.toggle('dark')
//         if(body.classList.contains('dark')) {
//             toggleImg.src = './images/icon-moon.svg'
//         } else {
//             toggleImg.src = './images/icon-sun.svg'
//         }
//     })
// }









