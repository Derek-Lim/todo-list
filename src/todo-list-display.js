import TL from './todo-list.js';

export default function displayTodoList() {
    const todoList = TL();
    const body = document.querySelector('body');
    const container = document.createElement('div');
    body.append(container);

    //create function to hyphenate strings
    const hyphenator = (string) => {
        return string.split(' ').join('-');
    }
    
    //render todo items
    todoList.list.forEach((item) => {
        //create container div
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        container.append(todoItem);
    
        //create sub-container div
        const leftDiv = document.createElement('div');
        todoItem.append(leftDiv);
        //create input
        const todoInput = document.createElement('input');
        todoInput.setAttribute('type', 'checkbox');
        todoInput.setAttribute('id', hyphenator(item.title));
        todoInput.setAttribute('name', hyphenator(item.title));
        leftDiv.append(todoInput);
        //create label
        const todoLabel = document.createElement('label');
        todoLabel.textContent = item.title;
        todoLabel.setAttribute('for', hyphenator(item.title));
        leftDiv.append(todoLabel);
    
        //create sub-container div
        const rightDiv = document.createElement('div');
        todoItem.append(rightDiv);
        //create "details" button
        const todoDetails = document.createElement('button');
        todoDetails.textContent = 'Details';
        rightDiv.append(todoDetails);
        //create div to show date
        const todoDate = document.createElement('div');
        todoDate.textContent = item.dueDate;
        rightDiv.append(todoDate);
        //create "delete" button
        const todoDelete = document.createElement('button');
        todoDelete.textContent = 'Delete';
        rightDiv.append(todoDelete);
    })
}