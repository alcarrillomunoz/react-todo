import TodoListItem from "./TodoListItem";
import style from "./TodoList.module.css";
import PropTypes from "prop-types";

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul className={style.TodoList}>
      {todoList.map((item) => (
        <TodoListItem
          key={item.id}
          id={item.id}
          todo={item.title}
          onRemoveTodo={onRemoveTodo}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todo: PropTypes.shape({
    key: PropTypes.string,
    id: PropTypes.string,
    todo: PropTypes.string,
    onRemoveTodo: PropTypes.func,
  }),
  onRemoveTodo: PropTypes.func,
};

export default TodoList;
