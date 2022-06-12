import { Express } from "express";
import NodeCache from "node-cache";

import { sql } from "slonik";
import path from "path";

import dotEnv from "dotenv";
import { DatabasePool } from "slonik";

dotEnv.config({ path: path.resolve(__dirname, "../../.env") });
const { env } = process;
const PG_TABLE = env.PG_TABLE as string;

// TODO: get from .env
const url = "/api/todos/get";

interface Props {
  url: string;
  get: (props: {
    app: Express;
    myCache: NodeCache;
    pool: DatabasePool;
  }) => Express;
}

const getTodos: Props = {
  url,
  get: ({ app, myCache, pool }) => {
    console.log("4. getTodos...");
    pool.connect(async (connection) => {
      try {
        const result = await connection.query(
          sql`SELECT * FROM ${PG_TABLE} ORDER BY id ASC`
        );
        console.log("5. example get from postgresql", result.rows);
      } catch(err) {
        console.log('GET  catch', {err})
      }
    });

    return app.get(url, (req, res) => {
      return res.send(myCache.mget(["pending", "completed"]));
    });
  },
};
export default getTodos;
