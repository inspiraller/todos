import { Express } from "express";
import NodeCache from "node-cache";
import { DatabasePool, sql } from "slonik";

// TODO: get from .env
const url = "/api/todos/get";

interface Props {
  url: string;
  get: (props: {
    app: Express;
    myCache: NodeCache;
    pool: DatabasePool;
    table: string;
  }) => Express;
}
const getTodos: Props = {
  url,
  get: ({ app, myCache, pool, table }) => {
    console.log("4. getTodos...");

    try {
      pool.connect(async (connection) => {
        console.log("connect", { table });

        const resultRows = await connection.query(sql`SELECT * FROM ${sql.identifier([table])} ORDER BY id ASC`);

 

        console.log("5. example get from postgresql", resultRows);
      });
    } catch (err) {
      console.log("GET  catch", { err });
    }

    return app.get(url, (req, res) => {
      return res.send(myCache.mget(["pending", "completed"]));
    });
  },
};
export default getTodos;
