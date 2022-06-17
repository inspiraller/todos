import { FC, Fragment, useEffect } from "react";

import useSWR from "swr";

import TodoArticle from "src/components/TodoArticle/TodoArticle";
import stylesTodo from "src/styles/Todo.module.css";

import { PREFIX_PROTOCOL, TtodosResponse } from "src/services/util";
import { fetchTodos, TODOS_URL_GET } from "src/services/getTodos";

import TodoAdd from "src/components/TodoAdd/TodoAdd";
import useTodos from "src/store/data/todos/useTodos";
import { RowPropsClient } from "src/types";

const Todos: FC = () => {
  const { acPopulateTodos, pending, completed } = useTodos();
  const { data: resp, error } = useSWR(`${PREFIX_PROTOCOL}${TODOS_URL_GET}`, fetchTodos);

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
        <TodoArticle todoGroup={"Pending"} todosList={pending as RowPropsClient[]} />
        <TodoArticle todoGroup={"Completed"} isCompleted={true} todosList={completed as RowPropsClient[]} />
      </div>
    </>
  );
};

export default Todos;
