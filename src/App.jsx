import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'
import { useState, useEffect } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

  async function fetchData() {
    const options = {
      method: "GET",
      headers: { Authorization:`Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN }` },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      const todosFromAPI = data.records.map((item) => {
        const newTodo = {
          id: item.id,
          title: item.fields.title,
        }
        return newTodo;
      })
      setTodoList(todosFromAPI);
      setIsLoading(false); 
    }
    catch (error) {
      console.log(error); 
    }
  }

  useEffect(() => {
    fetchData()
  }, []);  

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList]);

  async function addTodo(newTodo) {
    try {
    const newTodoTitle = {
      fields: {
        title: `${newTodo.title}`,
      }
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
        Authorization:`Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN }`, 
      },
      body: JSON.stringify(newTodoTitle),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    const newTodoFromAPI = {
      id: data.id,
      title: data.fields.title,
    }

    const newTodoList = [...todoList, newTodoFromAPI]; 
    setTodoList(newTodoList);
    }
    catch (error) {
      console.log(error); 
    }

    // new array with previous and new todo items
    // const newTodoList = [...todoList, newTodo];    
    // console.log(newTodoList);    //----> to log all todoList items
  }

  function removeTodo(id) {
    const newTodoList = todoList.filter((item) => item.id !== id); 
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