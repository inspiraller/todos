import { Express, Request, Response } from "express";
import { DatabasePool, DatabasePoolConnection, sql } from "slonik";
import { RowProps } from "src/types";
import { filterPending } from "../util/util";

// TODO: get from .env
const url = "/api/todos/post/update";

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
const updateTodo: Props = {
  url,
  post: ({ app, pool, table }) => {
    return app.post(url, async (req: Request, res: Response) => {
      const id = req.body.id || undefined;
      const completed = req.body.completed || false;

      try {
        const result = await pool.connect(async (connection) => {
          await updateCompleted({ connection, table, completed, id });

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
export default updateTodo;
