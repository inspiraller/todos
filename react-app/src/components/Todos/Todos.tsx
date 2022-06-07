import { FC, Fragment } from "react";

import useSWR from "swr";

import TodoArticle from "src/components/TodoArticle/TodoArticle";
import stylesTodo from "src/styles/Todo.module.css";

import { fetchTodos, TODOS_URL_GET } from "src/services/todos";
import TodoAdd from "src/components/TodoAdd/TodoAdd";

const Todos: FC = () => {
  const { data: resp, error } = useSWR(TODOS_URL_GET, fetchTodos);
  if (error) return <div className={stylesTodo.fail}>Failed to load</div>;
  if (!resp) return <div className={stylesTodo.loading}>Loading...</div>;

  const { todosListPending, todosListCompleted } = resp.data;
  return (
    <>
      <h1 className={stylesTodo.mainTitle}>Todos</h1>
      <TodoAdd />
      <div className={stylesTodo.wrapper}>
        <TodoArticle title={"Pending"} todosList={todosListPending} />
        <TodoArticle title={"Completd"} todosList={todosListCompleted} />
      </div>
    </>
  );
};

export default Todos;
