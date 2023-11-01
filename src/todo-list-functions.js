// When user checks or unchecks a checkbox,
// update "done" property, and change style accordingly
export function todoComplete(item, todoItem, todoInput, todoLabel,
                                todoDetails, todoDate, todoDelete, todoList) {
    if (todoInput.checked === true) {
        //add classes to allow style change through CSS
        todoItem.classList.add('done');
        todoLabel.classList.add('done');
        todoDetails.classList.add('done');
        todoDate.classList.add('done');
        todoDelete.classList.add('done');
        //change "done" property to true
        todoList.markDone(item);
    } else if (todoInput.checked === false) {
        //remove classes to remove style change through CSS
        todoItem.classList.remove('done');
        todoLabel.classList.remove('done');
        todoDetails.classList.remove('done');
        todoDate.classList.remove('done');
        todoDelete.classList.remove('done');
        //change "done" property back to false
        todoList.markUndone(item);
    }
}

//create function to hyphenate strings
export const hyphenator = (string) => {
    return string.split(' ').join('-');
}