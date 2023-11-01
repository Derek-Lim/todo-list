export default function TodoList() {
    //Array to store todo items
    const list = [
        //Todo list with one default item
        {
            title: 'brush teeth',
            description: 'firm bristle; colgate',
            dueDate: 'Oct 30, 2023',
            priority: 'high',
            done: false,
        },
        {
            title: 'get dressed',
            description: 'singlet',
            dueDate: 'Oct 31, 2023',
            priority: 'high',
            done: false,
        }
    ];
    //Function to add items to list
    const addTodo = (title, description, dueDate, priority) => {
        list.push(TodoItem(title, description, dueDate, priority));
    }
    
    //Keep track of whether tasks are completed
    const markDone = ((todo) => todo.done = true);
    const markUndone = ((todo) => todo.done = false);

    //Console.log items in list
    const printList = () => {
        list.forEach((todo) => console.log(todo));
    }

    return { list, addTodo, printList, markDone, markUndone };
}

function TodoItem(title, description, dueDate, priority) {
    const todoTitle = title;
    const todoDescription = description;
    const todoDueDate = dueDate;
    const todoPriority = priority;

    return { todoTitle, todoDescription, todoDueDate, todoPriority };
}