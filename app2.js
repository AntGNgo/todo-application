(() => {
    const list = document.querySelector('.list'),
    input = document.querySelector('.create-todo__input')
    
    let listLength = 0

    input.addEventListener('keydown', (e) => {
        if(e.keyCode === 13) {
            e.preventDefault()
            list.innerHTML += `<div class="task-container task draggable"><div class="task__check"></div><p class="task__name">${e.target.value}</p><div class="task__delete"></div></div>`
            store()
            e.target.value = ''
        }
        removeItem()
    })


    list.addEventListener('click', (e) => {
        let target = e.target

        if (!target.classList.contains('completed')) {
            target.classList.add('completed')
        } else {
            target.classList.remove('completed')
        }
        editItemCount()
        store()
    })

    const removeItem = () => {
        const delBtn = document.querySelectorAll('.task__delete')
        
        delBtn.forEach(btn => {
            btn.addEventListener('click', (e) => {
                console.log(list.removeChild(btn.parentNode))
            })
            store()
        })
    }

    const store = () => {
        localStorage.items = list.innerHTML
    }

    const getState = () => {
        return localStorage.items || []
    }

    const itemCount = () => {
        const itemsLeft = document.querySelector('.items-left')
        listLength === 1 ? itemsLeft.innerHTML = `1 item left` :  itemsLeft.innerHTML = `${listLength} items left`
    }

    const editItemCount = () => {
        let children = list.children

        for(let i = 0; i < children.length; i++) {
            let child = children[i]
            if(!child.classList.contains('completed')) {
                listLength++
            }
        }

        itemCount()
    }

    const renderState = () => {
        list.innerHTML = getState()
        listLength = list.children.length
        itemCount()
    }

    renderState()

    // Change Theme

    const body = document.querySelector('.body')
    const toggleImg = document.querySelector('.theme-image')
    const toggleTheme = document.getElementById('theme-toggle')
    toggleTheme.addEventListener('change', () => {
        body.classList.toggle('dark')
        if(body.classList.contains('dark')) {
            toggleImg.src = './images/icon-moon.svg'
        } else {
            toggleImg.src = './images/icon-sun.svg'
        }
    })


    // Filters

    const showAll = document.querySelector('.show-all')
    const showActive = document.querySelector('.show-active')
    const showCompleted = document.querySelector('.show-completed')

    const viewReset = () => {
        let children = list.children

        for(let i = 0; i < children.length; i++) {
            let child = children[i]
            child.style.display = "flex"
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

        let children = list.children

        for(let i = 0; i < children.length; i++) {
            let child = children[i]
            if(child.classList.contains('completed')) {
                console.log(child)
                child.style.display = 'none'
            }
        }
        
    })

    
    showCompleted.addEventListener('click', () => {
        if(!showCompleted.classList.contains('selected')) {
            showCompleted.classList.add('selected')
            showAll.classList.remove('selected')
            showActive.classList.remove('selected')
        }

        viewReset()
        
        let children = list.children

        for(let i = 0; i < children.length; i++) {
            let child = children[i]
            
            if(!child.classList.contains('completed')) {
                console.log(child)
                child.style.display = 'none'
            }
        }
        
    })

})()