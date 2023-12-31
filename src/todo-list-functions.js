import TL from './todo-list.js'

const TodoList = TL()
const list = TodoList.getList()

const body = document.querySelector('body')
const container = document.createElement('div')
container.classList.add('todo-list')
body.append(container)

export function DisplayTodoList (l) {
  // clear todo list
  container.textContent = ''
  // render todo items
  l.forEach((item, index) => {
    // create sub-container div
    const todoItem = document.createElement('div')
    todoItem.classList.add('todo-item')
    todoItem.classList.add(hyphenator(item.title))
    // add class to select items to change border color based on priority
    if (item.priority === 'high') {
      todoItem.classList.add('high')
    } else if (item.priority === 'medium') {
      todoItem.classList.add('medium')
    } else if (item.priority === 'low') {
      todoItem.classList.add('low')
    }
    container.append(todoItem)
    // if item was marked done, make sure to reflect that
    if (item.done === true) {
      todoItem.classList.add('done')
    }

    // create sub-sub-container div
    const leftDiv = document.createElement('div')
    leftDiv.classList.add('todo-left')
    todoItem.append(leftDiv)
    // create input
    const todoInput = document.createElement('input')
    todoInput.setAttribute('type', 'checkbox')
    todoInput.setAttribute('id', hyphenator(item.title))
    todoInput.setAttribute('name', hyphenator(item.title))
    // when user checks or unchecks a checkbox, update relevant properties
    todoInput.addEventListener('click', () => {
      todoComplete(item, todoItem, todoInput, todoLabel,
        todoDetails, todoDate, todoDelete, TodoList)
      // update local storage
      localStorage.clear()
      storeProjectsInLocal()
      storeTodosInLocal()
    })
    leftDiv.append(todoInput)
    // if item is marked done, make sure to reflect that
    if (item.done === true) {
      todoInput.checked = true
    }
    // create label
    const todoLabel = document.createElement('label')
    todoLabel.textContent = item.title
    todoLabel.setAttribute('for', hyphenator(item.title))
    leftDiv.append(todoLabel)
    // if item was marked done, make sure to reflect that
    if (item.done === true) {
      todoLabel.classList.add('done')
    }

    // create sub-sub-container div
    const rightDiv = document.createElement('div')
    rightDiv.classList.add('todo-right')
    todoItem.append(rightDiv)
    // create "details" button
    const todoDetails = document.createElement('button')
    todoDetails.classList.add('details')
    todoDetails.textContent = 'Details'
    // if user clicks "details", show user details, and allow editing
    if (item.title !== 'learn webkit' &&
            item.title !== 'jog') {
      todoDetails.addEventListener('click', () => {
        editTodoForm(item, index)
      })
    }
    rightDiv.append(todoDetails)
    // if item was marked done, make sure to reflect that
    if (item.done === true) {
      todoDetails.classList.add('done')
    }
    // create div to show date
    const todoDate = document.createElement('div')
    todoDate.textContent = item.dueDate
    rightDiv.append(todoDate)
    // if item was marked done, make sure to reflect that
    if (item.done === true) {
      todoDate.classList.add('done')
    }
    // create "delete" button
    const todoDelete = document.createElement('button')
    todoDelete.classList.add('delete')
    todoDelete.textContent = 'Delete'
    // if user clicks "delete", remove item from list, and update screen

    if (item.title !== 'learn webkit' &&
            item.title !== 'jog') {
      todoDelete.addEventListener('click', () => {
        l.splice(index, 1)
        // update storage
        localStorage.clear()
        storeProjectsInLocal()
        storeTodosInLocal()
        // display latest todo list
        DisplayTodoList(l)
      })
    }
    rightDiv.append(todoDelete)
    // if item was marked done, make sure to reflect that
    if (item.done === true) {
      todoDelete.classList.add('done')
    }
  })
}

// create function to hyphenate strings
const hyphenator = (string) => {
  return string.split(' ').join('-').toLowerCase()
}

export function addTodoButton () {
  const sidebar = document.querySelector('.sidebar')
  const todoButton = document.createElement('button')
  todoButton.classList.add('add-todo-button')
  todoButton.textContent = 'Add Todo'
  todoButton.addEventListener('click', () => {
    newTodoForm(body)
  })
  sidebar.append(todoButton)
}

// When user checks or unchecks a checkbox,
// update "done" property, and change style accordingly
function todoComplete (item, todoItem, todoInput, todoLabel,
  todoDetails, todoDate, todoDelete, TodoList) {
  if (todoInput.checked === true) {
    // add classes to allow style change through CSS
    todoItem.classList.add('done')
    todoLabel.classList.add('done')
    todoDetails.classList.add('done')
    todoDate.classList.add('done')
    todoDelete.classList.add('done')
    // change "done" property to true
    TodoList.markDone(item)
  } else if (todoInput.checked === false) {
    // remove classes to remove style change through CSS
    todoItem.classList.remove('done')
    todoLabel.classList.remove('done')
    todoDetails.classList.remove('done')
    todoDate.classList.remove('done')
    todoDelete.classList.remove('done')
    // change "done" property back to false
    TodoList.markUndone(item)
  }
}

function newTodoForm () {
  const sidebar = document.querySelector('.sidebar')

  // prevent multiple forms if user clicks "add todo" multiple times
  const previousForm = document.querySelector('.sidebar > form')
  if (previousForm) {
    previousForm.remove()
  }

  const form = document.createElement('form')
  sidebar.append(form)

  // create label for title
  const titleLabel = document.createElement('label')
  titleLabel.textContent = 'Title: '
  titleLabel.setAttribute('for', 'title')
  form.append(titleLabel)
  // create input for title
  const titleInput = document.createElement('input')
  titleInput.type = 'text'
  titleInput.name = 'title'
  titleInput.id = 'title'
  form.append(titleInput)

  // create label for project
  const projectLabel = document.createElement('label')
  projectLabel.textContent = 'Project: '
  projectLabel.setAttribute('for', 'project')
  form.append(projectLabel)
  // create input for project
  const projectInput = document.createElement('input')
  projectInput.type = 'text'
  projectInput.name = 'project'
  projectInput.id = 'project'
  form.append(projectInput)

  // create label for description
  const descriptionLabel = document.createElement('label')
  descriptionLabel.textContent = 'Description: '
  descriptionLabel.setAttribute('for', 'description')
  form.append(descriptionLabel)
  // create input for description
  const descriptionInput = document.createElement('input')
  descriptionInput.type = 'text'
  descriptionInput.name = 'description'
  descriptionInput.id = 'description'
  form.append(descriptionInput)

  // create label for duedate
  const dueDateLabel = document.createElement('label')
  dueDateLabel.textContent = 'Due-date: '
  dueDateLabel.setAttribute('for', 'duedate')
  form.append(dueDateLabel)
  // create input for duedate
  const dueDateInput = document.createElement('input')
  dueDateInput.type = 'date'
  dueDateInput.name = 'duedate'
  dueDateInput.id = 'duedate'
  form.append(dueDateInput)

  // create label for priority
  const priorityLabel = document.createElement('label')
  priorityLabel.textContent = 'Priority: '
  priorityLabel.setAttribute('for', 'priority')
  form.append(priorityLabel)
  // create dropdown for priority
  const priorityDropdown = document.createElement('select')
  priorityDropdown.id = 'priority'
  form.append(priorityDropdown)
  // create "high" option for dropdown
  const highOption = document.createElement('option')
  highOption.value = 'high'
  highOption.textContent = 'high'
  priorityDropdown.append(highOption)
  // create "medium" option for dropdown
  const mediumOption = document.createElement('option')
  mediumOption.value = 'medium'
  mediumOption.textContent = 'medium'
  priorityDropdown.append(mediumOption)
  // create "low" option for dropdown
  const lowOption = document.createElement('option')
  lowOption.value = 'low'
  lowOption.textContent = 'low'
  priorityDropdown.append(lowOption)

  // create submit button to add todo to the list
  const submitButton = document.createElement('button')
  submitButton.type = 'submit'
  submitButton.textContent = 'Submit'
  form.append(submitButton)
  // submit button will add todo to the todo list
  submitButton.addEventListener('click', () => {
    // prevent page refresh
    preventRefresh()
    // check for todo name duplicates
    const todoName = document.getElementById('title').value
    const todoNames = list.map((item) => item.title)
    const matchedtodoNames = todoNames.filter((item) => item.toLowerCase() === todoName.toLowerCase())
    // make sure user inputs title before submitting
    if (document.getElementById('title').value === '') {
      alert('Please input title.')
    } else if (matchedtodoNames.length !== 0) {
      alert('Todo already exists.')
      // make sure user inputs duedate before submitting
    } else if (document.getElementById('duedate').value === '') {
      alert('Please input due-date.')
      // if all required form fields are filled, add todo item to the list
    } else {
      TodoList.addTodo(
        document.getElementById('title').value,
        document.getElementById('description').value,
        document.getElementById('duedate').value,
        document.getElementById('priority').value,
        document.getElementById('project').value
      )
      // remove form
      form.remove()
      // update screen to display latest todo list
      displayAllList()
      // store todo in local storage
      storeTodosInLocal()
    }
  })

  // create cancel button
  const cancelButton = document.createElement('button')
  cancelButton.type = 'text'
  cancelButton.textContent = 'Cancel'
  form.append(cancelButton)
  // cancel button will remove form
  cancelButton.addEventListener('click', () => {
    form.remove()
  })
}

function editTodoForm (item, index) {
  const form = document.createElement('form')

  // prevent multiple forms if user clicks "details" multiple times
  const previousForm = document.querySelector('.todo-item > form')
  if (previousForm) {
    previousForm.remove()
  }

  const todoItem = document.querySelector(`.todo-item.${hyphenator(item.title)}`)
  todoItem.classList.add('edit')
  todoItem.append(form)

  // create label for title
  const titleLabel = document.createElement('label')
  titleLabel.textContent = 'Title: '
  titleLabel.setAttribute('for', 'title')
  form.append(titleLabel)
  // create input for title
  const titleInput = document.createElement('input')
  titleInput.type = 'text'
  titleInput.name = 'title'
  titleInput.id = 'title'
  titleInput.setAttribute('value', item.title)
  form.append(titleInput)

  // create label for project
  const projectLabel = document.createElement('label')
  projectLabel.textContent = 'Project: '
  projectLabel.setAttribute('for', 'project')
  form.append(projectLabel)
  // create input for project
  const projectInput = document.createElement('input')
  projectInput.type = 'text'
  projectInput.name = 'project'
  projectInput.id = 'project'
  projectInput.setAttribute('value', item.project)
  form.append(projectInput)

  // create label for description
  const descriptionLabel = document.createElement('label')
  descriptionLabel.textContent = 'Description: '
  descriptionLabel.setAttribute('for', 'description')
  form.append(descriptionLabel)
  // create input for description
  const descriptionInput = document.createElement('input')
  descriptionInput.type = 'text'
  descriptionInput.name = 'description'
  descriptionInput.id = 'description'
  descriptionInput.setAttribute('value', item.description)
  form.append(descriptionInput)

  // create label for duedate
  const dueDateLabel = document.createElement('label')
  dueDateLabel.textContent = 'Due-date: '
  dueDateLabel.setAttribute('for', 'duedate')
  form.append(dueDateLabel)
  // create input for duedate
  const dueDateInput = document.createElement('input')
  dueDateInput.type = 'date'
  dueDateInput.name = 'duedate'
  dueDateInput.id = 'duedate'
  dueDateInput.setAttribute('value', item.dueDate)
  form.append(dueDateInput)

  // create label for priority
  const priorityLabel = document.createElement('label')
  priorityLabel.textContent = 'Priority: '
  priorityLabel.setAttribute('for', 'priority')
  form.append(priorityLabel)
  // create dropdown for priority
  const priorityDropdown = document.createElement('select')
  priorityDropdown.id = 'priority'
  form.append(priorityDropdown)
  // create "high" option for dropdown
  const highOption = document.createElement('option')
  highOption.value = 'high'
  highOption.textContent = 'high'
  priorityDropdown.append(highOption)
  // create "medium" option for dropdown
  const mediumOption = document.createElement('option')
  mediumOption.value = 'medium'
  mediumOption.textContent = 'medium'
  priorityDropdown.append(mediumOption)
  // create "low" option for dropdown
  const lowOption = document.createElement('option')
  lowOption.value = 'low'
  lowOption.textContent = 'low'
  priorityDropdown.append(lowOption)
  // preselect priority value that user previously set
  if (item.priority === 'high') {
    highOption.setAttribute('selected', 'selected')
  } else if (item.priority === 'medium') {
    mediumOption.setAttribute('selected', 'selected')
  } else if (item.priority === 'low') {
    lowOption.setAttribute('selected', 'selected')
  }

  // create submit button to update todo
  const submitButton = document.createElement('button')
  submitButton.type = 'submit'
  submitButton.textContent = 'Confirm Edit'
  form.append(submitButton)
  // submit button will add todo to the todo list
  submitButton.addEventListener('click', () => {
    // prevent page refresh
    preventRefresh()
    // make sure user inputs title before submitting
    if (document.getElementById('title').value === '') {
      alert('Please input title.')
      // make sure user inputs duedate before submitting
    } else if (document.getElementById('duedate').value === '') {
      alert('Please input due-date.')
      // if all required form fields are filled, add todo item to the list
    } else {
      // remove original todo item, and add new item
      list.splice(index, 1, {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        dueDate: document.getElementById('duedate').value,
        priority: document.getElementById('priority').value,
        done: false,
        project: document.getElementById('project').value
      })
      // remove form
      form.remove()
      // update screen to display latest todo list
      displayAllList()
      // update storage
      localStorage.clear()
      storeProjectsInLocal()
      storeTodosInLocal()
    }
  })
}

// Prevent form from refreshing page when submit button is clicked
function preventRefresh () {
  const form = document.querySelector('form')
  form.addEventListener('submit', event => {
    event.preventDefault()
  })
}

export function displayStudyList () {
  const projectStudy = document.querySelector('.study')

  // remove class from previously selected item
  const previouslySelectedItem = document.querySelector('.selected')
  if (previouslySelectedItem) {
    previouslySelectedItem.classList.remove('selected')
  }
  // add class to div to show when it is selected
  projectStudy.classList.add('selected')
  // filter the list for items with "study" project
  const listStudy = list.filter((todo) => todo.project === 'study')
  // clear todo list
  container.textContent = ''
  // render todo items
  listStudy.forEach((item, index) => {
    // create sub-container div
    const todoItem = document.createElement('div')
    todoItem.classList.add('todo-item')
    todoItem.classList.add(hyphenator(item.title))
    // add class to select items to change border color based on priority
    if (item.priority === 'high') {
      todoItem.classList.add('high')
    } else if (item.priority === 'medium') {
      todoItem.classList.add('medium')
    } else if (item.priority === 'low') {
      todoItem.classList.add('low')
    }
    container.append(todoItem)
    // if item was marked done, make sure to reflect that
    if (item.done === true) {
      todoItem.classList.add('done')
    }

    // create sub-sub-container div
    const leftDiv = document.createElement('div')
    leftDiv.classList.add('todo-left')
    todoItem.append(leftDiv)
    // create label
    const todoLabel = document.createElement('label')
    todoLabel.textContent = item.title
    todoLabel.setAttribute('for', hyphenator(item.title))
    leftDiv.append(todoLabel)
    // if item was marked done, make sure to reflect that
    if (item.done === true) {
      todoLabel.classList.add('done')
    }

    // create sub-sub-container div
    const rightDiv = document.createElement('div')
    rightDiv.classList.add('todo-right')
    todoItem.append(rightDiv)
    // create div to show date
    const todoDate = document.createElement('div')
    todoDate.textContent = item.dueDate
    rightDiv.append(todoDate)
    // if item was marked done, make sure to reflect that
    if (item.done === true) {
      todoDate.classList.add('done')
    }
  })
}

export function displayGymList () {
  const projectGym = document.querySelector('.gym')

  // remove class from previously selected item
  const previouslySelectedItem = document.querySelector('.selected')
  if (previouslySelectedItem) {
    previouslySelectedItem.classList.remove('selected')
  }
  // add class to div to show when it is selected
  projectGym.classList.add('selected')
  // filter the list for items with "study" project
  const listGym = list.filter((todo) => todo.project === 'gym')
  // clear todo list
  container.textContent = ''
  // render todo items
  listGym.forEach((item) => {
    // create sub-container div
    const todoItem = document.createElement('div')
    todoItem.classList.add('todo-item')
    todoItem.classList.add(hyphenator(item.title))
    // add class to select items to change border color based on priority
    if (item.priority === 'high') {
      todoItem.classList.add('high')
    } else if (item.priority === 'medium') {
      todoItem.classList.add('medium')
    } else if (item.priority === 'low') {
      todoItem.classList.add('low')
    }
    container.append(todoItem)
    // if item was marked done, make sure to reflect that
    if (item.done === true) {
      todoItem.classList.add('done')
    }

    // create sub-sub-container div
    const leftDiv = document.createElement('div')
    leftDiv.classList.add('todo-left')
    todoItem.append(leftDiv)
    // create label
    const todoLabel = document.createElement('label')
    todoLabel.textContent = item.title
    todoLabel.setAttribute('for', hyphenator(item.title))
    leftDiv.append(todoLabel)
    // if item was marked done, make sure to reflect that
    if (item.done === true) {
      todoLabel.classList.add('done')
    }

    // create sub-sub-container div
    const rightDiv = document.createElement('div')
    rightDiv.classList.add('todo-right')
    todoItem.append(rightDiv)
    // create div to show date
    const todoDate = document.createElement('div')
    todoDate.textContent = item.dueDate
    rightDiv.append(todoDate)
    // if item was marked done, make sure to reflect that
    if (item.done === true) {
      todoDate.classList.add('done')
    }
  })
}

export function displayAllList () {
  const projectAll = document.querySelector('.all')

  // remove class from previously selected item
  const previouslySelectedItem = document.querySelector('.selected')
  if (previouslySelectedItem) {
    previouslySelectedItem.classList.remove('selected')
  }
  // add class to div to show when it is selected
  projectAll.classList.add('selected')
  // display all items
  DisplayTodoList(list)
}

export function addProjectButton () {
  const sidebar = document.querySelector('.sidebar')
  const projectButton = document.createElement('button')
  projectButton.classList.add('add-project-button')
  projectButton.textContent = 'Add Project'
  projectButton.addEventListener('click', () => {
    newProjectForm(body)
  })
  sidebar.append(projectButton)
}

function newProjectForm () {
  const sidebar = document.querySelector('.sidebar')

  // prevent multiple forms if user clicks "add todo" multiple times
  const previousForm = document.querySelector('.sidebar > form')
  if (previousForm) {
    previousForm.remove()
  }

  const form = document.createElement('form')
  sidebar.append(form)

  // create label for project name
  const projectLabel = document.createElement('label')
  projectLabel.textContent = 'Project: '
  projectLabel.setAttribute('for', 'project')
  form.append(projectLabel)
  // create input for project name
  const projectInput = document.createElement('input')
  projectInput.type = 'text'
  projectInput.name = 'project'
  projectInput.id = 'project'
  form.append(projectInput)

  // create submit button to add project
  const submitButton = document.createElement('button')
  submitButton.type = 'submit'
  submitButton.textContent = 'Submit'
  form.append(submitButton)
  // submit button will add project
  submitButton.addEventListener('click', () => {
    // prevent page refresh
    preventRefresh()
    // save user input
    const projectName = document.getElementById('project').value

    const projects = document.querySelectorAll('.sidebar > div')
    // create array to store list of projects
    const projectList = []
    // add project names to that array
    projects.forEach((project) => {
      projectList.push(project.textContent)
    })
    // filter through array to match projects with same name as user input
    const matchedProjectNames = projectList.filter((project) => project.toLowerCase() ===
                    document.getElementById('project').value.toLowerCase())
    // make sure user input is not empty before submitting
    if (document.getElementById('project').value === '') {
      alert('Project name cannot be blank.')
      // make sure project name doesn't already exist
    } else if (matchedProjectNames.length !== 0) {
      alert('Project already exists.')
    } else {
      // create div to add to sidebar
      const newProject = document.createElement('div')
      newProject.textContent = projectName
      newProject.classList.add(`${hyphenator(document.getElementById('project').value)}`)
      // remove form
      form.remove()
      // remove buttons
      const button1 = document.querySelector('.add-todo-button')
      button1.remove()
      const button2 = document.querySelector('.add-project-button')
      button2.remove()
      const button3 = document.querySelector('.delete-project-button')
      button3.remove()
      // add item, then re-add the buttons (to make buttons appear below projects)
      sidebar.append(newProject)
      addTodoButton()
      addProjectButton()
      deleteProjectButton()

      newProject.addEventListener('click', () => {
        // remove class from previously selected item
        const previouslySelectedItem = document.querySelector('.selected')
        if (previouslySelectedItem) {
          previouslySelectedItem.classList.remove('selected')
        }
        // add class to div to show when it is selected
        newProject.classList.add('selected')

        // filter through list to select all todos in stated category
        const listProject = list.filter((todo) => todo.project.toLowerCase() === projectName.toLowerCase())

        // clear todo list
        container.textContent = ''
        // render todo items
        listProject.forEach((item) => {
          // create sub-container div
          const todoItem = document.createElement('div')
          todoItem.classList.add('todo-item')
          todoItem.classList.add(hyphenator(item.title))
          // add class to select items to change border color based on priority
          if (item.priority === 'high') {
            todoItem.classList.add('high')
          } else if (item.priority === 'medium') {
            todoItem.classList.add('medium')
          } else if (item.priority === 'low') {
            todoItem.classList.add('low')
          }
          container.append(todoItem)
          // if item was marked done, make sure to reflect that
          if (item.done === true) {
            todoItem.classList.add('done')
          }

          // create sub-sub-container div
          const leftDiv = document.createElement('div')
          leftDiv.classList.add('todo-left')
          todoItem.append(leftDiv)
          // create label
          const todoLabel = document.createElement('label')
          todoLabel.textContent = item.title
          todoLabel.setAttribute('for', hyphenator(item.title))
          leftDiv.append(todoLabel)
          // if item was marked done, make sure to reflect that
          if (item.done === true) {
            todoLabel.classList.add('done')
          }

          // create sub-sub-container div
          const rightDiv = document.createElement('div')
          rightDiv.classList.add('todo-right')
          todoItem.append(rightDiv)
          // create div to show date
          const todoDate = document.createElement('div')
          todoDate.textContent = item.dueDate
          rightDiv.append(todoDate)
          // if item was marked done, make sure to reflect that
          if (item.done === true) {
            todoDate.classList.add('done')
          }
        })
      })
      // store project name in local storage
      storeProjectsInLocal()
    }
  })
  // create cancel button
  const cancelButton = document.createElement('button')
  cancelButton.type = 'text'
  cancelButton.textContent = 'Cancel'
  form.append(cancelButton)
  // cancel button will remove form
  cancelButton.addEventListener('click', () => {
    form.remove()
  })
}

export function deleteProjectButton () {
  const sidebar = document.querySelector('.sidebar')
  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'Delete Project'
  deleteButton.classList.add('delete-project-button')
  sidebar.append(deleteButton)

  deleteButton.addEventListener('click', () => {
    deleteProjectForm()
  })
}

function deleteProjectForm () {
  const sidebar = document.querySelector('.sidebar')

  // prevent multiple forms if user clicks "add todo" multiple times
  const previousForm = document.querySelector('.sidebar > form')
  if (previousForm) {
    previousForm.remove()
  }

  const form = document.createElement('form')
  sidebar.append(form)

  // create label for project remover
  const label = document.createElement('label')
  label.textContent = 'Remove: '
  label.setAttribute('for', 'project')
  form.append(label)
  // create dropdown for projects to remove
  const dropdown = document.createElement('select')
  dropdown.id = 'project'
  form.append(dropdown)
  // create options for dropdown
  const projects = document.querySelectorAll('.sidebar > div')
  projects.forEach((project) => {
    // make sure default categories are not removable
    if (project.textContent !== 'All' &&
            project.textContent !== 'Study' &&
            project.textContent !== 'Gym') {
      // create option for dropdown
      const option = document.createElement('option')
      option.value = `${project.textContent.toLowerCase()}`
      option.textContent = `${project.textContent}`
      dropdown.append(option)
    }
  })
  // create submit button
  const submit = document.createElement('button')
  submit.textContent = 'Remove'
  form.append(submit)
  submit.addEventListener('click', () => {
    preventRefresh()
    if (document.getElementById('project').value === '') {
      form.remove()
    } else {
      // create array to store list of projects
      const projectList = []
      // add project names to that array
      projects.forEach((project) => {
        projectList.push(project.textContent)
      })
      // filter through array to select selected project
      const projectToRemove = projectList.filter((project) =>
        project.toLowerCase() === document.getElementById('project').value.toLowerCase())
      // take selected project out of the array
      const projectToDelete = projectToRemove.pop()
      // select the div that matches the project name and remove it
      const projectToDiscard = document.querySelector(`.${projectToDelete.toLowerCase()}`)
      projectToDiscard.remove()
      // update projects in local storage
      localStorage.clear()
      storeProjectsInLocal()
      storeTodosInLocal()
      // remove form
      form.remove()
    }
  })
  // create cancel button
  const cancel = document.createElement('button')
  cancel.type = 'text'
  cancel.textContent = 'Cancel'
  form.append(cancel)
  // button will remove form when clicked
  cancel.addEventListener('click', () => {
    form.remove()
  })
}

function storeProjectsInLocal () {
  const createdProjects = document.querySelectorAll('.sidebar > div')
  createdProjects.forEach((project, index) => {
    if (project.textContent !== 'All' &&
            project.textContent !== 'Study' &&
            project.textContent !== 'Gym') {
      localStorage.setItem(`project${index - 3}`, project.textContent)
    }
  })
}

export function recreateProjectsFromLocal () {
  const localStorageProjectKeys = []

  Object.keys(localStorage).forEach(function (key) {
    if (key.includes('project')) {
      localStorageProjectKeys.push(key)
    }
  })

  for (let i = 0; i < localStorageProjectKeys.length; i++) {
    const sidebar = document.querySelector('.sidebar')
    // get name which was stored
    const projectName = localStorage.getItem(`project${i}`)

    // create div to add to sidebar
    const newProject = document.createElement('div')
    newProject.textContent = projectName
    newProject.classList.add(`${hyphenator(projectName)}`)
    // remove buttons
    const button1 = document.querySelector('.add-todo-button')
    button1.remove()
    const button2 = document.querySelector('.add-project-button')
    button2.remove()
    const button3 = document.querySelector('.delete-project-button')
    button3.remove()
    // add item, then re-add the buttons (to make buttons appear below projects)
    sidebar.append(newProject)
    addTodoButton()
    addProjectButton()
    deleteProjectButton()

    newProject.addEventListener('click', () => {
      // remove class from previously selected item
      const previouslySelectedItem = document.querySelector('.selected')
      if (previouslySelectedItem) {
        previouslySelectedItem.classList.remove('selected')
      }
      // add class to div to show when it is selected
      newProject.classList.add('selected')

      // filter through list to select all todos in stated category
      const listProject = list.filter((todo) => todo.project.toLowerCase() === projectName.toLowerCase())

      // clear todo list
      container.textContent = ''
      // render todo items
      listProject.forEach((item) => {
        // create sub-container div
        const todoItem = document.createElement('div')
        todoItem.classList.add('todo-item')
        todoItem.classList.add(hyphenator(item.title))
        // add class to select items to change border color based on priority
        if (item.priority === 'high') {
          todoItem.classList.add('high')
        } else if (item.priority === 'medium') {
          todoItem.classList.add('medium')
        } else if (item.priority === 'low') {
          todoItem.classList.add('low')
        }
        container.append(todoItem)
        // if item was marked done, make sure to reflect that
        if (item.done === true) {
          todoItem.classList.add('done')
        }

        // create sub-sub-container div
        const leftDiv = document.createElement('div')
        leftDiv.classList.add('todo-left')
        todoItem.append(leftDiv)
        // create label
        const todoLabel = document.createElement('label')
        todoLabel.textContent = item.title
        todoLabel.setAttribute('for', hyphenator(item.title))
        leftDiv.append(todoLabel)
        // if item was marked done, make sure to reflect that
        if (item.done === true) {
          todoLabel.classList.add('done')
        }

        // create sub-sub-container div
        const rightDiv = document.createElement('div')
        rightDiv.classList.add('todo-right')
        todoItem.append(rightDiv)
        // create div to show date
        const todoDate = document.createElement('div')
        todoDate.textContent = item.dueDate
        rightDiv.append(todoDate)
        // if item was marked done, make sure to reflect that
        if (item.done === true) {
          todoDate.classList.add('done')
        }
      })
    })
  }
}

function storeTodosInLocal () {
  const createdTodos = list
  createdTodos.forEach((todo, index) => {
    if (todo.title !== 'learn webkit' &&
            todo.title !== 'jog') {
      localStorage.setItem(`todo${index - 2}`, JSON.stringify(todo))
    }
  })
}

export function recreateTodosFromLocal () {
  const localStorageProjectKeys = []

  Object.keys(localStorage).forEach(function (key) {
    if (key.includes('todo')) {
      localStorageProjectKeys.push(key)
    }
  })

  localStorageProjectKeys.forEach((key) => {
    // get todo object and add it to the list
    const todo = JSON.parse(localStorage.getItem(key))
    list.push(todo)
    // update screen to display latest todo list
    displayAllList()
  })
}
