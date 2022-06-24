import { Express, Request, Response } from "express";
import { DatabasePool, DatabasePoolConnection, QueryResult, sql } from "slonik";
import { RowProps } from "src/types";
import { filterPending } from "../util/util";

// TODO: get from .env
const url = "/api/todos/post/add";

type Tadd = (props: {
  connection: DatabasePoolConnection;
  table: string;
  todoText: string;
}) => Promise<any>;

const add: Tadd = async ({ connection, table, todoText }) =>
  await connection.query(
    sql`INSERT INTO ${sql.identifier([table])}("todoText") VALUES(${todoText})`
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
      pool.connect(async (connection) => {
        try {
          await add({ connection, table, todoText });
        } catch (err) {
          return res.send(false);
        }

        try {
          const resultRows = await connection.query<RowProps>(
            sql`SELECT * FROM ${sql.identifier([table])} ORDER BY id ASC`
          );
          const pending = filterPending(resultRows.rows);
          return res.send(pending);
        } catch (err) {
          return res.send(false); 
        }
      });


    });
  },
};
export default addTodo;
