import React, { FC, useCallback } from "react";
import { updateTodo } from "src/services/updateTodo";

import useTodos from "src/store/data/todos/useTodos";
import { TevtInputChange } from "src/types";
import TodoLabel from "./TodoLabel";

type ThandleChange = (evt: TevtInputChange) => void;
type TuseUpdate = (props: { isCompleted?: boolean }) => {
  handleChange: ThandleChange;
};

export const useUpdate: TuseUpdate = ({ isCompleted }) => {
  const { acPopulateTodos } = useTodos();
  const handleUpdate = (id: string) => {
    updateTodo({ id, completed: !isCompleted }).then((resp) => {
      const both = resp.data;
      acPopulateTodos(both);
    });
  };

  const handleChange: ThandleChange = (evt) => {
    const id = evt.target.value;
    handleUpdate(id);
  };

  return { handleChange };
};

interface Props {
  isCompleted?: boolean;
  id: number | string;
  todoText: string;
  handleChange: ThandleChange;
}

const TodoUpdate: FC<Props> = ({ isCompleted, id, todoText, handleChange }) => {
  return (
    <TodoLabel
      isCompleted={isCompleted}
      id={id}
      todoText={todoText}
      handleChange={handleChange}
    />
  );
};

export default TodoUpdate;
