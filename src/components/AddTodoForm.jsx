import { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import style from "./AddTodoForm.module.css";
import PropTypes from "prop-types";

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  function handleTitleChange(event) {
    let newTodoTitle = event.target.value;
    //console.log(newTodoTitle);
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo({ title: todoTitle, id: Date.now() }); //passing object instead of string, assigns date stamp to id
    setTodoTitle(""); // logic to reset todoTitle to empty string
  }

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
      >
        Title
      </InputWithLabel>
      <button type="submit" className={style.AddButton}>
        Add
      </button>
    </form>
  );
}

AddTodoForm.propTypes = { onAddTodo: PropTypes.func };

export default AddTodoForm;
