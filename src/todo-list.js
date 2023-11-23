export default function TodoList () {
  // Array to store todo items
  const list = [
    // Todo list with default items
    {
      title: 'learn webkit',
      description: '',
      dueDate: '2023-10-30',
      priority: 'high',
      done: false,
      project: 'study'
    },
    {
      title: 'jog',
      description: '10 miles',
      dueDate: '2023-10-31',
      priority: 'medium',
      done: false,
      project: 'gym'
    }
  ]

  const getList = () => list

  // Function to add items to list
  const addTodo = (title, description, dueDate, priority, project) => {
    list.push(TodoItem(title, description, dueDate, priority, project))
  }

  // Keep track of whether tasks are completed
  const markDone = (todo) => { todo.done = true }
  const markUndone = (todo) => { todo.done = false }

  return { getList, addTodo, markDone, markUndone }
}

function TodoItem (todoTitle, todoDescription, todoDueDate, todoPriority,
  todoProject = '') {
  const title = todoTitle
  const description = todoDescription
  const dueDate = todoDueDate
  const priority = todoPriority
  const done = false
  const project = todoProject

  return { title, description, dueDate, priority, done, project }
}
