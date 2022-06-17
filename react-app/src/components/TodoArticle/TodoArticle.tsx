import React, { FC } from "react";
import { updateTodo } from "src/services/updateTodo";

import useTodos from "src/store/data/todos/useTodos";
import stylesTodo from "src/styles/Todo.module.css";
import { RowPropsClient, TevtInputChange } from "src/types";

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
  const { acPopulateTodos } = useTodos();
  const handleChange = (evt: TevtInputChange) => {
    const id = evt.target.value;

    console.log('handleChange', {id, isCompleted: !isCompleted})
    updateTodo({ id, completed: !isCompleted }).then((resp) => {
      acPopulateTodos({
        pending: resp.data,
      });
    });
  }
  return (
    <article className={stylesTodo.group}>
      <h2 className={stylesTodo.groupHeading}>{todoGroup}</h2>
      {todosList.length ? (
        <ul className={stylesTodo.ul}>
          {todosList.map(({ todoText, id }) => (
            <li key={`todo_li_${id}`}>
              <Label isCompleted={isCompleted} id={id} todoText={todoText} handleChange={handleChange} />
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
};

export default TodoArticle;
