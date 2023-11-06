import './style.css';
import { displayAllList, displayStudyList, displayGymList,
            addTodoButton, addProjectButton } from './todo-list-functions.js';

//initial render
displayAllList();
addTodoButton();
addProjectButton();
//make "all" div show all projects when clicked
const projectAll = document.querySelector('.all');
projectAll.addEventListener('click', () => {
    displayAllList();
})
//make "study" div show all gym projects when clicked
const projectStudy = document.querySelector('.study');
projectStudy.addEventListener('click', () => {
    displayStudyList();
})
//make "gym" div show all study projects when clicked
const projectGym = document.querySelector('.gym');
projectGym.addEventListener('click', () => {
    displayGymList();
})