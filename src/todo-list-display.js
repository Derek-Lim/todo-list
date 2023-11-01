import TL from './todo-list.js';
import {todoComplete, hyphenator} from './todo-list-functions.js';

export default function displayTodoList() {
    const todoList = TL();
    const body = document.querySelector('body');
    const container = document.createElement('div');
    body.append(container);
    
    //render todo items
    todoList.list.forEach((item) => {
        //create container div
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        container.append(todoItem);
    
        //create sub-container div
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
                    todoDetails, todoDate, todoDelete, todoList);
        })
        leftDiv.append(todoInput);
        //create label
        const todoLabel = document.createElement('label');
        todoLabel.textContent = item.title;
        todoLabel.setAttribute('for', hyphenator(item.title));
        leftDiv.append(todoLabel);
    
        //create sub-container div
        const rightDiv = document.createElement('div');
        rightDiv.classList.add('todo-right');
        todoItem.append(rightDiv);
        //create "details" button
        const todoDetails = document.createElement('button');
        todoDetails.classList.add('details');
        todoDetails.textContent = 'Details';
        rightDiv.append(todoDetails);
        //create div to show date
        const todoDate = document.createElement('div');
        todoDate.textContent = item.dueDate;
        rightDiv.append(todoDate);
        //create "delete" button
        const todoDelete = document.createElement('button');
        todoDelete.classList.add('delete');
        todoDelete.textContent = 'Delete';
        rightDiv.append(todoDelete);
    })
}