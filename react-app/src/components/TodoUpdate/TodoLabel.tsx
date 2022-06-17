import React, { FC } from "react";
import stylesTodo from "src/styles/Todo.module.css";
import { RowPropsClient, TevtInputChange } from "src/types";

interface PropsLabel extends RowPropsClient {
  isCompleted?: boolean;
  handleChange: (evt: TevtInputChange) => void;
}
const TodoLabel: FC<PropsLabel> = ({ isCompleted, id, todoText, handleChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        value={id}
        checked={isCompleted}
        onChange={handleChange}
      />
      <span className={stylesTodo.todoGroup}>{todoText}</span>
    </label>
  );
};

export default TodoLabel;