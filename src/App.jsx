import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'
import { useState, useEffect } from 'react';

//custom hook 
const useSemiPersistentState = () => {
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem('savedTodoList')) || []
  );

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
}

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);  // new array with previous and new todo items
    // const newTodoList = [...todoList, newTodo];    
    // console.log(newTodoList);    //----> to log all todoList items
  }

  function removeTodo(id) {
    const newTodoList = todoList.filter((item) => item.id !== id)
    setTodoList([...newTodoList]); 
  }

  return (
      <>
        <h1>Todo List</h1>
        <AddTodoForm onAddTodo={addTodo} />
        <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>   
      </>     
  )
}

export default App
