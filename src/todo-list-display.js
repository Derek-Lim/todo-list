import TL from './todo-list.js';

const TodoList = TL();
const list = TodoList.getList();

const body = document.querySelector('body');
const container = document.createElement('div');
container.classList.add()
body.append(container);

export function DisplayTodoList() {
    //clear todo list
    container.textContent = '';
    //render todo items
    list.forEach((item, index) => {
        //create sub-container div
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        todoItem.classList.add(hyphenator(item.title));
        container.append(todoItem);
        //if item was marked done, make sure to reflect that
        if (item.done === true) {
            todoItem.classList.add('done');
        }

        //create sub-sub-container div
        const leftDiv = document.createElement('div');
        leftDiv.classList.add('todo-left');
        todoItem.append(leftDiv);
        //create input
        const todoInput = document.createElement('input');
        todoInput.setAttribute('type', 'checkbox');
        todoInput.setAttribute('id', hyphenator(item.title));
        todoInput.setAttribute('name', hyphenator(item.title));
        // when user checks or unchecks a checkbox, update relevant properties
        todoInput.addEventListener('click', () => {
            todoComplete(item, todoItem, todoInput, todoLabel,
                    todoDetails, todoDate, todoDelete, TodoList);
        })
        leftDiv.append(todoInput);
        //if item is marked done, make sure to reflect that
        if (item.done === true) {
            todoInput.checked = true;
        }
        //create label
        const todoLabel = document.createElement('label');
        todoLabel.textContent = item.title;
        todoLabel.setAttribute('for', hyphenator(item.title));
        leftDiv.append(todoLabel);
        //if item was marked done, make sure to reflect that
        if (item.done === true) {
            todoLabel.classList.add('done');
        }
    
        //create sub-sub-container div
        const rightDiv = document.createElement('div');
        rightDiv.classList.add('todo-right');
        todoItem.append(rightDiv);
        //create "details" button
        const todoDetails = document.createElement('button');
        todoDetails.classList.add('details');
        todoDetails.textContent = 'Details';
        //if user clicks "details", show user details, and allow editing
        todoDetails.addEventListener('click', () => {
            editTodoForm(item, index);
        })
        rightDiv.append(todoDetails);
        //if item was marked done, make sure to reflect that
        if (item.done === true) {
            todoDetails.classList.add('done');
        }
        //create div to show date
        const todoDate = document.createElement('div');
        todoDate.textContent = item.dueDate;
        rightDiv.append(todoDate);
        //if item was marked done, make sure to reflect that
        if (item.done === true) {
            todoDate.classList.add('done');
        }
        //create "delete" button
        const todoDelete = document.createElement('button');
        todoDelete.classList.add('delete');
        todoDelete.textContent = 'Delete';
        //if user clicks "delete", remove item from list, and update screen
        todoDelete.addEventListener('click', () => {
            list.splice(index, 1);
            DisplayTodoList();
        })
        rightDiv.append(todoDelete);
        //if item was marked done, make sure to reflect that
        if (item.done === true) {
            todoDelete.classList.add('done');
        }
    })
}

//create function to hyphenate strings
const hyphenator = (string) => {
    return string.split(' ').join('-');
}

export function addTodoButton() {
    const todoButton = document.createElement('button');
    todoButton.classList.add('add-todo-button');
    todoButton.textContent = 'Add Todo';
    todoButton.addEventListener('click', () => {
        newTodoForm(body);
    })
    body.append(todoButton);
}

// When user checks or unchecks a checkbox,
// update "done" property, and change style accordingly
function todoComplete(item, todoItem, todoInput, todoLabel,
                                todoDetails, todoDate, todoDelete, TodoList) {
    if (todoInput.checked === true) {
        //add classes to allow style change through CSS
        todoItem.classList.add('done');
        todoLabel.classList.add('done');
        todoDetails.classList.add('done');
        todoDate.classList.add('done');
        todoDelete.classList.add('done');
        //change "done" property to true
        TodoList.markDone(item);
    } else if (todoInput.checked === false) {
        //remove classes to remove style change through CSS
        todoItem.classList.remove('done');
        todoLabel.classList.remove('done');
        todoDetails.classList.remove('done');
        todoDate.classList.remove('done');
        todoDelete.classList.remove('done');
        //change "done" property back to false
        TodoList.markUndone(item);
    }
}

function newTodoForm(container) {
    const form = document.createElement('form');
    container.append(form);

    //create label for title
    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title: ';
    titleLabel.setAttribute('for', 'title');
    form.append(titleLabel);
    //create input for title
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleInput.id = 'title';
    form.append(titleInput);

    //create label for description
    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description: ';
    descriptionLabel.setAttribute('for', 'description');
    form.append(descriptionLabel);
    //create input for description
    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.name = 'description';
    descriptionInput.id = 'description';
    form.append(descriptionInput);

    //create label for duedate
    const dueDateLabel = document.createElement('label');
    dueDateLabel.textContent = 'Due-date: ';
    dueDateLabel.setAttribute('for', 'duedate');
    form.append(dueDateLabel);
    //create input for duedate
    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.name = 'duedate';
    dueDateInput.id = 'duedate';
    form.append(dueDateInput);

    //create label for priority
    const priorityLabel = document.createElement('label');
    priorityLabel.textContent = 'Priority: ';
    priorityLabel.setAttribute('for', 'priority');
    form.append(priorityLabel);
    //create dropdown for priority
    const priorityDropdown = document.createElement('select');
    priorityDropdown.id = 'priority';
    form.append(priorityDropdown);
    //create "high" option for dropdown
    const highOption = document.createElement('option');
    highOption.value = 'high';
    highOption.textContent = 'high';
    priorityDropdown.append(highOption);
    //create "medium" option for dropdown
    const mediumOption = document.createElement('option');
    mediumOption.value = 'medium';
    mediumOption.textContent = 'medium';
    priorityDropdown.append(mediumOption);
    //create "low" option for dropdown
    const lowOption = document.createElement('option');
    lowOption.value = 'low';
    lowOption.textContent = 'low';
    priorityDropdown.append(lowOption);

    //create submit button to add todo to the list
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    form.append(submitButton);
    //submit button will add todo to the todo list
    submitButton.addEventListener('click', () => {
        //prevent page refresh
        preventRefresh();
        //make sure user inputs title before submitting
        if(document.getElementById('title').value === '') {
            alert('Please input title.');
        //make sure user inputs description before submitting
        } else if (document.getElementById('description').value === '') {
            alert('Please input description.');
        //make sure user inputs duedate before submitting
        } else if (document.getElementById('duedate').value === '') {
            alert('Please input due-date.');
        //if all form fields are filled, add todo item to the list
        } else {
            TodoList.addTodo(// TodoList.addTodo(
                document.getElementById('title').value,
                document.getElementById('description').value,
                document.getElementById('duedate').value,
                document.getElementById('priority').value,
            )
            //remove form
            form.remove();
            //update screen to display latest todo list
            DisplayTodoList();
        }
    })
}

function editTodoForm(item, index) {
    const form = document.createElement('form');
    const todoItem = document.querySelector(`.${hyphenator(item.title)}`)
    todoItem.classList.add('edit');
    todoItem.append(form);

    //create label for title
    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title: ';
    titleLabel.setAttribute('for', 'title');
    form.append(titleLabel);
    //create input for title
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleInput.id = 'title';
    titleInput.setAttribute('value', item.title);
    form.append(titleInput);

    //create label for description
    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description: ';
    descriptionLabel.setAttribute('for', 'description');
    form.append(descriptionLabel);
    //create input for description
    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.name = 'description';
    descriptionInput.id = 'description';
    descriptionInput.setAttribute('value', item.description);
    form.append(descriptionInput);

    //create label for duedate
    const dueDateLabel = document.createElement('label');
    dueDateLabel.textContent = 'Due-date: ';
    dueDateLabel.setAttribute('for', 'duedate');
    form.append(dueDateLabel);
    //create input for duedate
    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.name = 'duedate';
    dueDateInput.id = 'duedate';
    dueDateInput.setAttribute('value', item.dueDate);
    form.append(dueDateInput);

    //create label for priority
    const priorityLabel = document.createElement('label');
    priorityLabel.textContent = 'Priority: ';
    priorityLabel.setAttribute('for', 'priority');
    form.append(priorityLabel);
    //create dropdown for priority
    const priorityDropdown = document.createElement('select');
    priorityDropdown.id = 'priority';
    form.append(priorityDropdown);
    //create "high" option for dropdown
    const highOption = document.createElement('option');
    highOption.value = 'high';
    highOption.textContent = 'high';
    priorityDropdown.append(highOption);
    //create "medium" option for dropdown
    const mediumOption = document.createElement('option');
    mediumOption.value = 'medium';
    mediumOption.textContent = 'medium';
    priorityDropdown.append(mediumOption);
    //create "low" option for dropdown
    const lowOption = document.createElement('option');
    lowOption.value = 'low';
    lowOption.textContent = 'low';
    priorityDropdown.append(lowOption);
    //preselect priority value that user previously set
    if (item.priority === 'high') {
        highOption.setAttribute('selected', 'selected');
    } else if (item.priority === 'medium') {
        mediumOption.setAttribute('selected', 'selected');
    } else if (item.priority === 'low') {
        lowOption.setAttribute('selected', 'selected');
    }

    //create submit button to update todo
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Confirm Edit';
    form.append(submitButton);
    //submit button will add todo to the todo list
    submitButton.addEventListener('click', () => {
        //prevent page refresh
        preventRefresh();
        //make sure user inputs title before submitting
        if(document.getElementById('title').value === '') {
            alert('Please input title.');
        //make sure user inputs description before submitting
        } else if (document.getElementById('description').value === '') {
            alert('Please input description.');
        //make sure user inputs duedate before submitting
        } else if (document.getElementById('duedate').value === '') {
            alert('Please input due-date.');
        //if all form fields are filled, add todo item to the list
        } else {
            //remove original todo item, and add new item
            list.splice(index, 1, {
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                dueDate: document.getElementById('duedate').value,
                priority: document.getElementById('priority').value,
                done: false,
            });
            //remove form
            form.remove();
            //update screen to display latest todo list
            DisplayTodoList();
        }
    })
}

//Prevent form from refreshing page when submit button is clicked
function preventRefresh() {
    const form = document.querySelector('form');
    form.addEventListener('submit', event => {
        event.preventDefault();
    })
}