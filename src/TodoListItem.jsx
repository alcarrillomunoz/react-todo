import style from "./TodoListItem.module.css";

function TodoListItem({ todo, id, onRemoveTodo }) {
  return (
    <li className={style.ListItem}>
      {todo}
      <button
        type="button"
        className={style.RemoveButton}
        onClick={() => onRemoveTodo(id)}
      >
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;
