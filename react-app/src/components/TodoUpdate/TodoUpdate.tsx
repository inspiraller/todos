import React, { FC, useCallback } from "react";
import { updateTodo } from "src/services/updateTodo";

import useTodos from "src/store/data/todos/useTodos";
import { TevtInputChange, Tid } from "src/types";
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
  id: Tid;
  todoText: string;
  handleChange: ThandleChange;
  created_timestamp: string;
  completed?: string;
}

const TodoUpdate: FC<Props> = ({ id, todoText, handleChange, created_timestamp, completed }) => {
  return (
    <TodoLabel
      id={id}
      todoText={todoText}
      handleChange={handleChange}
      created_timestamp={created_timestamp}
      completed={completed}
    />
  );
};

export default TodoUpdate;
