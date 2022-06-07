import type { NextPage } from "next";
import MasterHead from "src/components/Head/MasterHead";
import styles from "src/styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <MasterHead />
      <main className={styles.main}>
        <h1 className={styles.todos__mainTitle}>Todos</h1>

        <div className={styles.todos__wrapper}>
          <article className={styles.todos__group}>
            <h2 className={styles.todos__groupHeading}>Pending</h2>
            <ul className={styles.grid}>
              <li>
                <h3 className={styles.todos__title}>Documentation 1</h3>
              </li>
              <li>
                <h3 className={styles.todos__title}>Documentation 2</h3>
              </li>
              <li>
                <h3 className={styles.todos__title}>Documentation 3</h3>
              </li>
            </ul>
          </article>

          <article className={styles.todos__group}>
            <h2 className={styles.todos__groupHeading}>Completed</h2>
            <ul className={styles.grid}>
            <li>
                <h3 className={styles.todos__title}>Documentation 4</h3>
              </li>
              <li>
                <h3 className={styles.todos__title}>Documentation 5</h3>
              </li>
 
            </ul>
          </article>
        </div>
      </main>
    </div>
  );
};

export default Home;
