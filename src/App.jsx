import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'
import { useState, useEffect } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve( {
          data: 
          { todoList: JSON.parse(localStorage.getItem('savedTodoList')) || [] }
        })
      }, 2000);
    })
    .then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    })
  }, []);  

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList]);

  async function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
    // new array with previous and new todo items
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
        {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>   
      )}
      </>     
  )
}

export default App
