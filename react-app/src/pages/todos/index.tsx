import type { NextPage } from "next";
import useSWR from "swr";

import MasterHead from "src/components/Head/MasterHead";
import TodoArticle from "src/components/TodoArticle/TodoArticle";
import styles from "src/styles/Home.module.css";
import { fetchTodos, TODOS_URL_GET } from "src/services/todos";


const Todos: NextPage = () => {
  const { data: resp, error } = useSWR(TODOS_URL_GET, fetchTodos);
  if (error) return <div>Failed to load</div>;
  if (!resp) return <div>Loading...</div>;

  const { todosListPending, todosListCompleted } = resp.data;
  return (
    <div className={styles.container}>
      <MasterHead />
      <main className={styles.main}>
        <h1 className={styles.todos__mainTitle}>Todos</h1>

        <div className={styles.todos__wrapper}>
          <TodoArticle title={"Pending"} todosList={todosListPending} />
          <TodoArticle title={"Completd"} todosList={todosListCompleted} />
        </div>
      </main>
    </div>
  );
};

export default Todos;
