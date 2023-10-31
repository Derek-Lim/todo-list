export default function TodoList() {
    //Array to store todo items
    const list = [
        //Todo list with one default item
        {
            title: 'brush teeth',
            description: 'firm bristle; colgate',
            dueDate: 'Oct 30, 2023',
            priority: 'high',
        }
    ];
    //Function to add items to list
    const addTodo = (title, description, dueDate, priority) => {
        list.push(TodoItem(title, description, dueDate, priority));
    }
    //Console.log items in list
    const printList = () => {
        list.forEach((todo) => console.log(todo));
    }

    return { addTodo, printList };
}

function TodoItem(title, description, dueDate, priority) {
    const todoTitle = title;
    const todoDescription = description;
    const todoDueDate = dueDate;
    const todoPriority = priority;

    return { todoTitle, todoDescription, todoDueDate, todoPriority };
}