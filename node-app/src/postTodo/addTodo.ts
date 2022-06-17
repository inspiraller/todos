import { Express, Request, Response } from "express";
import { DatabasePool, DatabasePoolConnection, sql } from "slonik";
import { RowProps } from "src/types";
import { filterPending } from "../util/util";

// TODO: get from .env
const url = "/api/todos/post/add";

type Tadd = (props: {
  connection: DatabasePoolConnection;
  table: string;
  todoText: string;
}) => void;
const add: Tadd = async ({ connection, table, todoText }) =>
  await connection.query(
    sql`INSERT INTO ${sql.identifier([
      table,
    ])}("todoText",completed) VALUES(${todoText}, false)`
  );

interface Props {
  url: string;
  post: (props: { app: Express; pool: DatabasePool; table: string }) => Express;
}
const addTodo: Props = {
  url,
  post: ({ app, pool, table }) => {
    return app.post(url, async (req: Request, res: Response) => {
      const todoText = req.body?.todoText;
      try {
        await pool.connect(async (connection) => {
          await add({ connection, table, todoText });
        });
      } catch (err) {
        console.log("node get1 - catch", { err });
      }
      try {
        await pool.connect(async (connection) => {
          const resultRows = await connection.query<RowProps>(
            sql`SELECT * FROM ${sql.identifier([table])} ORDER BY id ASC`
          );
          const pending = filterPending(resultRows.rows);
          return res.send(pending);
        });
      } catch (err) {
        console.log("node get2 - catch", { err });
      }
      return res.send(false); // TODO: handle error
    });
  },
};
export default addTodo;
