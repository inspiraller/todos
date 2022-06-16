import {Express, Request, Response} from "express";
import { DatabasePool, sql } from "slonik";
import { RowProps } from "src/types";
import { filterPending } from "../util/util";

// TODO: get from .env
const url = "/api/todos/post";

interface Props {
  url: string;
  post: (props: {
    app: Express;
    pool: DatabasePool;
    table: string;
  }) => Express;
}
const postTodo: Props = {
  url,
  post: ({ app, pool, table }) => {
    return app.post(url, async (req: Request, res: Response) => {
      const todoText = req.body?.todoText;
      // TODO: capture error handling, hacking etc...
      if (todoText) {

        try {
          const result = await pool.connect(async (connection) => {
            await connection.query(sql`INSERT INTO ${sql.identifier([table])}("todoText",completed) VALUES(${todoText}, false)`);
            const resultRows = await connection.query<RowProps>(
              sql`SELECT * FROM ${sql.identifier([table])} ORDER BY id ASC`
            );
            const pending = filterPending(resultRows.rows);
            return res.send(pending);
          });
          return result
        } catch (err) {
          console.log("node get - catch", { err });
        }
      }
      return res.send(false); // TODO: handle error
    })
  }
};
export default postTodo;
