import { Express } from "express";
import { DatabasePool, QueryResult, sql } from "slonik";
import { ReadonlyRows, RowProps } from "src/types";
import { filterCompleted, filterPending } from "../util/util";

// TODO: get from .env
const url = "/api/todos/get";


type TgetFromDb = (props: {
  pool: DatabasePool;
  table: string;
}) => Promise<ReadonlyRows>;

const getFromDb: TgetFromDb = async ({ pool, table }) =>
  await pool.connect(async (connection) => {
    const resultRows = await connection.query<RowProps>(
      sql`SELECT * FROM ${sql.identifier([table])} ORDER BY id ASC`
    );
    console.log('getFromDb', {resultRows})
    return resultRows.rows;
  });

interface Props {
  url: string;
  get: (props: { app: Express; pool: DatabasePool; table: string }) => Express;
}

const getTodos: Props = {
  url,
  get: ({ app, pool, table }) => {
    return app.get(url, async (req, res) => {
      const rows = await getFromDb({ pool, table });
      const pending = filterPending(rows);
      const completed = filterCompleted(rows);
      return res.send({pending, completed});
    });
  },
};
export default getTodos;
