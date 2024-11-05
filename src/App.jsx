import { useState } from 'react'
import './App.css'

const todoList = [ 
  {
    id: 1, 
    title: "Complete lesson materials",
  },
  {
    id: 2,
    title: "Attend group session",
  },
  {
    id: 3,
    title: "Complete assignment"
  },
];

function App() {
  return (
      <div>
        <h1>Todo List</h1>
        <ul>
          {todoList.map(function (item) {
            return (
              <li key={item.id}>{item.title}</li>
            )
          })}
        </ul>
      </div>     
  )
}

export default App
