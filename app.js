(() => {
    const list = document.querySelector('.list'),
    input = document.querySelector('.create-todo__input'),
    clearCompleted = document.querySelector('.clear-completed')

    input.addEventListener('keydown', (e) => {
        if(e.keyCode === 13) {
            e.preventDefault()
            list.innerHTML += `<div class="task-container task draggable" draggable=true><div class="task__check"></div><p class="task__name">${e.target.value}</p><div class="task__delete"></div></div>`
            setDragging()
            itemCount()
            store()
            e.target.value = ''
        }
        removeItem()
    })


    list.addEventListener('click', (e) => {
        let target = e.target

        if(target.classList.contains('task__name')) {
            if (!target.parentNode.classList.contains('completed')) {
                target.parentNode.classList.add('completed')
            } else {
                target.parentNode.classList.remove('completed')
            }
        } else {
            if (!target.classList.contains('completed')) {
                target.classList.add('completed')
            } else {
                target.classList.remove('completed')
            }
        }
        itemCount()
        store()
    })

    const removeItem = () => {
        const delBtn = document.querySelectorAll('.task__delete')
        
        delBtn.forEach(btn => {
            btn.addEventListener('click', (e) => {
                list.removeChild(btn.parentNode)
            })
            itemCount()
            store()
        })
    }

    clearCompleted.addEventListener('click', () => {
        const currentList = Array.from(list.children)
        const filteredList = currentList.filter(item => !item.classList.contains('completed'))

        list.innerHTML = ''
        filteredList.forEach(item => list.innerHTML += item.outerHTML)
    })

    const store = () => {
        localStorage.items = list.innerHTML
    }

    const getState = () => {
        return localStorage.items || []
    }

    const itemCount = () => {
        const currentList = Array.from(list.children)
        const activeItems = currentList.filter(item => !item.classList.contains('completed'))
        const itemsLeft = document.querySelector('.items-left')
        activeItems.length === 1 ? itemsLeft.innerHTML = `1 item left` :  itemsLeft.innerHTML = `${activeItems.length} items left`
    }


    const renderState = () => {
        list.innerHTML = getState()
        listLength = list.children.length
        itemCount()
    }

    renderState()


    // Filters

    const showAll = document.querySelector('.show-all')
    const showActive = document.querySelector('.show-active')
    const showCompleted = document.querySelector('.show-completed')

    const mobileShowAll = document.querySelector('.mobile-all')
    const mobileShowActive = document.querySelector('.mobile-active')
    const mobileShowCompleted = document.querySelector('.mobile-completed')

    

    const viewReset = () => {
        let children = list.children

        for(let i = 0; i < children.length; i++) {
            let child = children[i]
            child.style.display = "flex"
        }
    }


    const activeFilter = () => {
        let children = list.children

        for(let i = 0; i < children.length; i++) {
            let child = children[i]
            if(child.classList.contains('completed')) {
                child.style.display = 'none'
            }
        }
        
    }

    const completedFilter = () => {
        let children = list.children

        for(let i = 0; i < children.length; i++) {
            let child = children[i]
            
            if(!child.classList.contains('completed')) {
                child.style.display = 'none'
            }
        }
    }

    showAll.addEventListener('click', () => {
        if(!showAll.classList.contains('selected')) {
            showAll.classList.add('selected')
            showActive.classList.remove('selected')
            showCompleted.classList.remove('selected')
        }
        viewReset()
    })

    
    showActive.addEventListener('click', () => {
        if(!showActive.classList.contains('selected')) {
            showActive.classList.add('selected')
            showAll.classList.remove('selected')
            showCompleted.classList.remove('selected')
        }

        viewReset()
        activeFilter()
    })

    
    showCompleted.addEventListener('click', () => {
        if(!showCompleted.classList.contains('selected')) {
            showCompleted.classList.add('selected')
            showAll.classList.remove('selected')
            showActive.classList.remove('selected')
        }

        viewReset()
        completedFilter()
    })

    mobileShowAll.addEventListener('click', () => {
        if(!mobileShowAll.classList.contains('selected')) {
            mobileShowAll.classList.add('selected')
            mobileShowActive.classList.remove('selected')
            mobileShowCompleted.classList.remove('selected')
        }
        viewReset()
    })

    mobileShowActive.addEventListener('click', () => {
        if(!mobileShowActive.classList.contains('selected')) {
            mobileShowActive.classList.add('selected')
            mobileShowAll.classList.remove('selected')
            mobileShowCompleted.classList.remove('selected')
        }

        viewReset()
        activeFilter()
    })

    mobileShowCompleted.addEventListener('click', () => {
        if(!mobileShowCompleted.classList.contains('selected')) {
            mobileShowCompleted.classList.add('selected')
            mobileShowAll.classList.remove('selected')
            mobileShowActive.classList.remove('selected')
        }

        viewReset()
        completedFilter()
    })


    // Dragging Function

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

    // Change Theme

    const body = document.querySelector('.body')
    const toggleImg = document.querySelector('.theme-image')
    const toggleTheme = document.getElementById('theme-toggle')
    toggleTheme.addEventListener('change', () => {
        body.classList.toggle('dark')
        if(body.classList.contains('dark')) {
            localStorage.theme = 'dark'
            toggleImg.src = './images/icon-moon.svg'
        } else {
            localStorage.theme = 'light'
            toggleImg.src = './images/icon-sun.svg'
        }
    })

    const checkTheme = () => {
        if(localStorage.theme === 'light') {
            body.classList.remove('dark')
            toggleImg.src = './images/icon-sun.svg'
        } else {
            body.classList.add('dark')
            toggleImg.src = './images/icon-moon.svg'
        }
    }

    checkTheme()
    removeItem()
    setDragging()

})()