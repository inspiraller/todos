import React, { FC } from "react";
import useTodos from "src/store/data/todos/useTodos";
import stylesTodo from "src/styles/Todo.module.css";
import { RowPropsClient, TevtInputChange } from "src/types";
import TodoUpdate, { useUpdate } from "../TodoUpdate/TodoUpdate";

interface Props {
  todoGroup: string;
  todosList: RowPropsClient[];
  isCompleted?: boolean;
}

interface PropsLabel extends RowPropsClient {
  isCompleted?: boolean;
  handleChange: (evt: TevtInputChange) => void;
}
const Label: FC<PropsLabel> = ({ isCompleted, id, todoText, handleChange }) => {
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

const TodoArticle: FC<Props> = ({ todoGroup, todosList = [], isCompleted }) => {
  const { handleChange } = useUpdate({ isCompleted });
  return (
    <article className={stylesTodo.group}>
      <h2 className={stylesTodo.groupHeading}>{todoGroup}</h2>
      {todosList.length ? (
        <ul className={stylesTodo.ul}>
          {todosList.map(({ todoText, id }) => (
            <li key={`todo_li_${id}`}>
              <TodoUpdate
                isCompleted={isCompleted}
                id={id}
                todoText={todoText}
                handleChange={handleChange}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
};

export default TodoArticle;
