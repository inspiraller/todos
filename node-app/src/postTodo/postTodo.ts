import { Express, Request, Response } from "express";
import { DatabasePool, DatabasePoolConnection, sql } from "slonik";
import { RowProps } from "src/types";
import { filterPending } from "../util/util";

// TODO: get from .env
const url = "/api/todos/post";

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

type TupdateCompleted = (props: {
  connection: DatabasePoolConnection;
  table: string;
  completed: boolean;
  id: string | number;
}) => void;
const updateCompleted: TupdateCompleted = async ({
  connection,
  table,
  completed,
  id,
}) =>
  await connection.query(
    sql`UPDATE ${sql.identifier([
      table,
    ])} set completed = ${completed} WHERE id = '${id}'`
  );

interface Props {
  url: string;
  post: (props: { app: Express; pool: DatabasePool; table: string }) => Express;
}
const postTodo: Props = {
  url,
  post: ({ app, pool, table }) => {
    return app.post(url, async (req: Request, res: Response) => {
      console.log("postTodos body = ", { body: req.body });
      const todoText = req.body?.todoText;
      const id = req.body.id || undefined;
      const completed = req.body.completed || false;
      // TODO: capture error handling, hacking etc...

      try {
        const result = await pool.connect(async (connection) => {
          if (id === undefined && todoText) {
            await add({ connection, table, todoText });
          } else if (id !== undefined) {
            await updateCompleted({ connection, table, completed, id });
          }
          const resultRows = await connection.query<RowProps>(
            sql`SELECT * FROM ${sql.identifier([table])} ORDER BY id ASC`
          );
          const pending = filterPending(resultRows.rows);
          return res.send(pending);
        });
        return result;
      } catch (err) {
        console.log("node get - catch", { err });
      }

      return res.send(false); // TODO: handle error
    });
  },
};
export default postTodo;
