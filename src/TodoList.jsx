
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
  
function TodoList() {
    return (
        <ul>
        {todoList.map((item) => (
            <li key={item.id}>{item.title}</li>
          )
        )}
      </ul> 
    )
}

export default TodoList