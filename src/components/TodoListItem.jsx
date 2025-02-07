import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

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

TodoListItem.propTypes = {
  todo: PropTypes.string,
  id: PropTypes.string,
  onRemoveTodo: PropTypes.func,
};

export default TodoListItem;
