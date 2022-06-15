

import path from "path";
import dotEnv from "dotenv";

import { sql, createPool } from "slonik";

dotEnv.config({ path: path.resolve(__dirname, "../.env") });

const { env } = process;

const PG_DB = env.PG_DB as string;
const PG_USER = env.PG_USER as string;
const PG_PWD = env.PG_PWD as string;
const PG_TABLE = env.PG_TABLE as string;

const init = () => {
  // postgresql://[user[:password]@][host[:port]][/database name][?name=value[&...]]
  console.log("createPool");
  const pool = createPool(
    `postgresql://${PG_USER}:${PG_PWD}@localhost:5432/${PG_DB}`
  );

  pool.connect(async (connection) => {
    try {
      const result = await connection.query(sql`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = ${PG_TABLE});`);
      const isExist = result.rows[0].exists;
      console.log('1. isExist', {result, isExist})

    } catch(err) {
      console.log(err)
    }
  })
  // createTableIfNotExist(pool, initServer);
};

init();
