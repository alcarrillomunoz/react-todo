import { useState } from "react";

function AddTodoForm({onAddTodo}) {
    const [todoTitle, setTodoTitle] = useState('');
    
    function handleTitleChange(event) {
        let newTodoTitle = event.target.value;
        //console.log(newTodoTitle); 
        setTodoTitle(newTodoTitle);
    }

    function handleAddTodo(event) {
        event.preventDefault(); 
        onAddTodo({title: todoTitle, id: Date.now()}); //passing object instead of string, assigns date stamp to id
        setTodoTitle('');    // logic to reset todoTitle to empty string
    }
   
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input id="todoTitle" name="title" value={todoTitle} onChange={handleTitleChange}></input>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm