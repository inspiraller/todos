import React, { FC } from "react";
import stylesTodo from "src/styles/Todo.module.css";

interface Props {
  title: string;
  todosList: string[];
  dataTestId?: string;
  dataTestIdItemExists?: string;
}

const truncate = (title: string): string => title.replace(/[\s\W]/g, '_');

const TodoArticle: FC<Props> = ({ title, todosList = [], dataTestId = '', dataTestIdItemExists = '' }) => {
  return (
    <article className={stylesTodo.group} data-testid={dataTestId}>
      <h2 className={stylesTodo.groupHeading}>{title}</h2>
      {todosList.length ? (
        <ul className={stylesTodo.ul} data-testid={dataTestIdItemExists}>
          {todosList.map((todoTitle) => (
            <li key={`todo_li_${truncate(todoTitle)}`}><h3 className={stylesTodo.title}>{todoTitle}</h3></li>
          ))}
        </ul>
      ) : null}
    </article>
  );
};

export default TodoArticle;
