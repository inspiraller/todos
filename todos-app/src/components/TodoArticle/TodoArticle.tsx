import React, { FC } from "react";
import styles from "src/styles/Home.module.css";

interface Props {
  title: string;
  todosList: string[];
}

const truncate = (title: string): string => title.replace(/[\s\W]/g, '_');

const TodoArticle: FC<Props> = ({ title, todosList = [] }) => {
  return (
    <article className={styles.todos__group}>
      <h2 className={styles.todos__groupHeading}>{title}</h2>
      {todosList.length ? (
        <ul className={styles.grid}>
          {todosList.map((todoTitle) => (
            <li key={`todo_li_${truncate(todoTitle)}`}><h3 className={styles.todos__title}>{todoTitle}</h3></li>
          ))}
        </ul>
      ) : null}
    </article>
  );
};

export default TodoArticle;
