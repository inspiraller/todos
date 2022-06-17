import React, { FC, useState } from "react";
import { addTodo } from "src/services/addTodo";
import useTodos from "src/store/data/todos/useTodos";
import { TevtForm, TevtInputChange } from "src/types";

const TodoAdd: FC = () => {
  const { acPopulateTodos, pending } = useTodos();

  const [todoValue, setTodoValue] = useState("");

  const handleChange = (evt: TevtInputChange) => {
    setTodoValue(evt.target.value);
  };
  const handleSubmit = (evt: TevtForm) => {
    const isTodoTextExist = pending?.some(item => item.todoText === todoValue)
    if (!isTodoTextExist) {
      addTodo({ todoText: todoValue }).then((resp) => {
        acPopulateTodos({
          pending: resp.data,
        });
      });
    }
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
