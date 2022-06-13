

import path from "path";
import dotEnv from "dotenv";

import { sql, createPool } from "slonik";

dotEnv.config({ path: path.resolve(__dirname, "../.env") });

const { env } = process;

const PG_DB = env.PG_DB as string;
const PG_USER = env.PG_USER as string;
const PG_PWD = env.PG_PWD as string;
const PG_TABLE = env.PG_TABLE as string;

console.log({ PG_DB, PG_USER, PG_PWD, PG_TABLE });


const query1 = sql`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = ${PG_TABLE});`;
const query2 = sql`CREATE TABLE ${PG_TABLE} (id SERIAL PRIMARY KEY, name VARCHAR(500) NOT NULL, completed BOOLEAN NOT NULL);`
const init = () => {
  // postgresql://[user[:password]@][host[:port]][/database name][?name=value[&...]]
  console.log("createPool");
  const pool = createPool(
    `postgresql://${PG_USER}:${PG_PWD}@localhost:5432/${PG_DB}`
  );

  pool.connect(async (connection) => {
    try {
      const result = await connection.query(query1);
      const isExist = result.rows[0].exists;
      console.log('1. isExist', {result, isExist})

      const result2 = await connection.query(query2);
      console.log('2. createTable', {result2})

    } catch(err) {
      console.log(err)
    }
  })
  // createTableIfNotExist(pool, initServer);
};

init();
