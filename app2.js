(() => {
    const list = document.querySelector('.list'),
    input = document.querySelector('.create-todo__input'),
    itemsLeft = document.querySelector('.items-left')
    listLength = 0

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
        target.classList.toggle('completed')
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
        const state = localStorage.items || []
        list.innerHTML = state
    }

    getState()

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

})()