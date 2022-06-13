import { Express } from "express";
import NodeCache from "node-cache";
import { DatabasePoolConnection, sql } from "slonik";

// TODO: get from .env
const url = "/api/todos/get";

interface Props {
  url: string;
  get: (props: {
    app: Express;
    myCache: NodeCache;
    connection: DatabasePoolConnection;
    table: string;
  }) => Promise<Express>;
}

const getTodos: Props = {
  url,
  get: async ({ app, myCache, connection, table }) => {
    console.log("4. getTodos...");

    try {
      const result = await connection.query(
        sql`SELECT * FROM ${table} ORDER BY id ASC`
      );
      console.log("5. example get from postgresql", result.rows);
    } catch (err) {
      console.log("GET  catch", { err });
    }

    return app.get(url, (req, res) => {
      return res.send(myCache.mget(["pending", "completed"]));
    });
  },
};
export default getTodos;
