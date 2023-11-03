export default function TodoList() {
    //Array to store todo items
    const list = [
        //Todo list with default items
        {
            title: 'brush teeth',
            description: 'firm bristle; colgate',
            dueDate: '2023-10-30',
            priority: 'high',
            done: false,
        },
        {
            title: 'get dressed',
            description: 'singlet',
            dueDate: '2023-10-31',
            priority: 'high',
            done: false,
        }
    ];

    const getList = () => list;

    //Function to add items to list
    const addTodo = (title, description, dueDate, priority) => {
        list.push(TodoItem(title, description, dueDate, priority));
    }

    //Keep track of whether tasks are completed
    const markDone = ((todo) => todo.done = true);
    const markUndone = ((todo) => todo.done = false);

    return { getList, addTodo, markDone, markUndone };
}

function TodoItem(todoTitle, todoDescription, todoDueDate, todoPriority) {
    const title = todoTitle;
    const description = todoDescription;
    const dueDate = todoDueDate;
    const priority = todoPriority;
    const done = false;

    return { title, description, dueDate, priority, done };
}