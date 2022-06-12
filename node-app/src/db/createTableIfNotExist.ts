import path from "path";
import dotEnv from "dotenv";

import { sql, DataIntegrityError } from "slonik";
import type { DatabasePool } from "slonik";

dotEnv.config({ path: path.resolve(__dirname, "../.env") });

const { env } = process;

const PG_DB = env.PG_DB as string;
const PG_USER = env.PG_USER as string;
const PG_PWD = env.PG_PWD as string;
const PG_TABLE = env.PG_TABLE as string;

const createTable = async (pool: DatabasePool) => {
  console.log({
    PG_DB,
    PG_PWD,
    PG_USER,
    PG_TABLE,
    Q: sql`
  CREATE TABLE ${"PG_TABLE"}(
    id SERIAL PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    completed BOOLEAN NOT NULL);
`,
  });
  new Promise(async (resolve, reject) => {
    const query = sql`
    CREATE TABLE ${PG_TABLE}(
      id SERIAL PRIMARY KEY,
      name VARCHAR(500) NOT NULL,
      completed BOOLEAN NOT NULL);
  `;
  console.log('query', query)
    pool.connect(async (connection) => {
      try {
        const result = await connection.query(query);
        resolve(result);
      } catch (err) {
        console.log("2. TABLE XISTS", { err });
        resolve(true);
      }
      //  finally {
      //   await (connection as any).release();
      // }
    });
  });
};

export const createTableIfNotExist = async (
  pool: DatabasePool,
  cb: (pool: DatabasePool) => void
) => {
  const query = sql`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = ${PG_TABLE});`;
  pool.connect(async (connection) => {
    try {
      const result = await connection.query(query);

      const isExist = result.rows[0].exists;

      console.log("result", {
        result,
        rows: result.rows[0],
        isExist,
      });
      if (!isExist) {
        createTable(pool).then(() => cb(pool));
      } else {
        cb(pool);
      }
    } catch (err) {
      console.log("2. catch", { err });
      if (err instanceof DataIntegrityError) {
        console.error(
          "There is more than one row matching the select criteria."
        );
      } else {
        throw err;
      }
    }
    // finally {
    //   await (connection as any).release();
    // }
  });
};
