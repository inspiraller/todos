import React, { FC, useState } from "react";
import { postTodo } from "src/services/todos";
import { TevtForm, TevtInputChange } from "src/types";

const TodoAdd: FC = () => {
  const [todoValue, setTodoValue] = useState("");

  const handleChange = (evt: TevtInputChange) => {
    setTodoValue(evt.target.value);
  };
  const handleSubmit = (evt: TevtForm) => {
    postTodo({ title: todoValue }).then(resp => {
      console.log(resp.data); // pending []
      // populate context/redux/reducer etc
    })
    evt.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add Todo</legend>
        <input
          type="text"
          aria-label="todo"
          placeholder="todo"
          value={todoValue}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </fieldset>
    </form>
  );
};

export default TodoAdd;
