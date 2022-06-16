import { FC, Fragment, useEffect } from "react";

import useSWR from "swr";

import TodoArticle from "src/components/TodoArticle/TodoArticle";
import stylesTodo from "src/styles/Todo.module.css";

import { fetchTodos, prefixProtocol, TODOS_URL_GET, TtodosResponse } from "src/services/todos";
import TodoAdd from "src/components/TodoAdd/TodoAdd";
import useTodos from "src/store/data/todos/useTodos";

const Todos: FC = () => {
  const { acPopulateTodos, pending, completed } = useTodos();
  const { data: resp, error } = useSWR(`${prefixProtocol}${TODOS_URL_GET}`, fetchTodos);

  const obj = (resp as TtodosResponse)?.data;
  const pendingLoaded = obj?.pending
  const completedLoaded = obj?.completed;

  useEffect(() => {

    acPopulateTodos({
      pending: pendingLoaded,
      completed: completedLoaded,
    });
  }, [pendingLoaded, completedLoaded]);

  if (error) return <div className={stylesTodo.fail}>Failed to load</div>;
  if (!resp) return <div className={stylesTodo.loading}>Loading...</div>;


  return (
    <>
      <h1 className={stylesTodo.mainTitle}>Todos</h1>
      <TodoAdd />
      <div className={stylesTodo.wrapper}>
        <TodoArticle todoGroup={"Pending"} todosList={pending as string[]} />
        <TodoArticle todoGroup={"Completed"} todosList={completed as string[]} />
      </div>
    </>
  );
};

export default Todos;
