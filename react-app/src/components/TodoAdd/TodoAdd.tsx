import React, { FC, useState } from "react";
import { addTodo } from "src/services/addTodo";
import useTodos from "src/store/data/todos/useTodos";
import { TevtForm, TevtInputChange } from "src/types";
import stylesTodo from "src/styles/Todo.module.css";

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
      setTodoValue('');
    }
    evt.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className={stylesTodo.formAdd}>
      <fieldset>
        <legend className={stylesTodo.legend}>Add Todo</legend>
        <input
          type="text"
          aria-label="todo"
          placeholder="Add todo"
          value={todoValue}
          onChange={handleChange}
          className={stylesTodo.inputText}
        />
        <button type="submit" className={stylesTodo.addButton}>Add</button>
      </fieldset>
    </form>
  );
};

export default TodoAdd;
