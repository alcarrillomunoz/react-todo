function AddTodoForm(props) {
    function handleAddTodo(event) {
        event.preventDefault(); 
        let todoTitle = event.target.title.value;
        console.log(todoTitle); 
        props.onAddTodo(todoTitle); 
        event.currentTarget.reset(); 
    }
   
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input id="todoTitle" name="title"></input>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm