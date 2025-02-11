import "./App.css";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

let ListOrder = true;

function App() {
  const [todoList, setTodoList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [sort, setSort] = useState("asc");

  const url = `https://api.airtable.com/v0/${
    import.meta.env.VITE_AIRTABLE_BASE_ID
  }/${import.meta.env.VITE_TABLE_NAME}`;

  const sorting = "?sort[0][field]=title&sort[0][direction]=" + sort;

  async function fetchData() {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url + sorting, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      const todosFromAPI = data.records.map((item) => {
        const newTodo = {
          id: item.id,
          title: item.fields.title,
        };
        return newTodo;
      });
      setTodoList(todosFromAPI);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  function handleOrder() {
    if (ListOrder === true) {
      setSort("asc");
      ListOrder = false;
    } else {
      setSort("desc");
      ListOrder = true;
    }
    fetchData();
  }

  useEffect(() => {
    handleOrder();
    //fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  async function addTodo(newTodo) {
    try {
      const newTodoTitle = {
        fields: {
          title: `${newTodo.title}`,
        },
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
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
      };

      const newTodoList = [...todoList, newTodoFromAPI];

      const sortedTodoList = newTodoList.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

      setTodoList(sortedTodoList);
    } catch (error) {
      console.log(error);
    }
    // new array with previous and new todo items
    // const newTodoList = [...todoList, newTodo];
    // console.log(newTodoList);    //----> to log all todoList items
  }

  async function removeTodo(id) {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList([...newTodoList]);

    try {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
      };

      const response = await fetch(url + "/" + id, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      // const data = await response.json();
      // console.log("deleted", data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              addTodo={addTodo}
              isLoading={isLoading}
              todoList={todoList}
              removeTodo={removeTodo}
              handleOrder={handleOrder}
            />
          }
        />
        <Route
          path="/new"
          element={
            <>
              <h1>New Todo List</h1>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function Homepage({ addTodo, isLoading, todoList, removeTodo, handleOrder }) {
  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button onClick={handleOrder} className="orderButton">
            {" "}
            <svg
              fill="#000000"
              height="24px"
              width="24px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 490 490"
              xmlSpace="preserve"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <polygon points="85.877,154.014 85.877,428.309 131.706,428.309 131.706,154.014 180.497,221.213 217.584,194.27 108.792,44.46 0,194.27 37.087,221.213 "></polygon>{" "}
                  <polygon points="404.13,335.988 404.13,61.691 358.301,61.691 358.301,335.99 309.503,268.787 272.416,295.73 381.216,445.54 490,295.715 452.913,268.802 "></polygon>{" "}
                </g>{" "}
              </g>
            </svg>{" "}
          </button>
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        </>
      )}
    </>
  );
}

export default App;
