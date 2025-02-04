import { useRef, useEffect } from "react";
import style from "./InputWithLabel.module.css";

function InputWithLabel({ todoTitle, handleTitleChange, children }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor="todoTitle" className={style.Label}>
        {children}
      </label>
      <input
        id="todoTitle"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
        ref={inputRef}
        className={style.Input}
      ></input>
    </>
  );
}

export default InputWithLabel;
