import React, { FC } from "react";
import stylesTodo from "src/styles/Todo.module.css";

interface Props {
  todoGroup: string;
  todosList: string[];
}

const truncate = (text: string): string => text.replace(/[\s\W]/g, '_');

const TodoArticle: FC<Props> = ({ todoGroup, todosList = [] }) => {
  return (
    <article className={stylesTodo.group}>
      <h2 className={stylesTodo.groupHeading}>{todoGroup}</h2>
      {todosList.length ? (
        <ul className={stylesTodo.ul}>
          {todosList.map((todoText) => (
            <li key={`todo_li_${truncate(todoText)}`}><h3 className={stylesTodo.todoGroup}>{todoText}</h3></li>
          ))}
        </ul>
      ) : null}
    </article>
  );
};

export default TodoArticle;
