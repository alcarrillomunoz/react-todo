import TodoListItem from "./TodoListItem";

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
          <TodoListItem key={item.id} todo={item.title} />
          )
        )}
      </ul> 
    )
}

export default TodoList