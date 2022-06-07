import type { NextPage } from "next";
import MasterHead from "src/components/Head/MasterHead";
import stylesMain from "src/styles/Main.module.css";
import Todos from "src/components/Todos/Todos";

const TodosPage: NextPage = () => {
  return (
    <div className={stylesMain.container}>
      <MasterHead />
      <main className={stylesMain.main}>
        <Todos />
      </main>
    </div>
  );
};

export default TodosPage;
