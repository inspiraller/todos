import React, { FC, useState } from "react";
import { postTodo } from "src/services/todos";
import useTodos from "src/store/data/todos/useTodos";
import { TevtForm, TevtInputChange } from "src/types";

export const TEXT_TODO = 'My todo';

const TodoAdd: FC = () => {
  const { acPopulateTodos, pending } = useTodos();

  const [todoValue, setTodoValue] = useState("");

  const handleChange = (evt: TevtInputChange) => {
    setTodoValue(evt.target.value);
  };
  const handleSubmit = (evt: TevtForm) => {
    if ((pending as string[]).indexOf(todoValue) === -1) {
      postTodo({ title: todoValue }).then((resp) => {
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
          aria-label={TEXT_TODO}
          placeholder={TEXT_TODO}
          value={todoValue}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </fieldset>
    </form>
  );
};

export default TodoAdd;
