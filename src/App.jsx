import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'
import { useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);  // new array with previous and new todo items
    // const newTodoList = [...todoList, newTodo];    
    // console.log(newTodoList);    //----> to log all todoList items
  }

  return (
      <div>
        <h1>Todo List</h1>
        <AddTodoForm onAddTodo={addTodo} />
        <TodoList todoList={todoList}/>   
      </div>     
  )
}

export default App
