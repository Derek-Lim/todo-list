import './style.css';
import TodoList from './todo-list.js';

const list = TodoList();

//confirm that methods work
list.addTodo('get dressed', 'singlet', 'Oct 31', 'high');
list.printList();