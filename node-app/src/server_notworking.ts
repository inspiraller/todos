import path from "path";
import dotEnv from "dotenv";
import { createPool, sql } from "slonik";

dotEnv.config({ path: path.resolve(__dirname, "../.env") });

const { env } = process;

const PG_DB = env.PG_DB as string;
const PG_USER = env.PG_USER as string;
const PG_PWD = env.PG_PWD as string;
const PG_TABLE = env.PG_TABLE as string;


const init = () => {
  // postgresql://[user[:password]@][host[:port]][/database name][?name=value[&...]]
  const pool = createPool(
    `postgresql://${PG_USER}:${PG_PWD}@localhost:5432/${PG_DB}`
  );
  pool.connect(async (connection) => {
    const table = PG_TABLE
    const resultExist = await connection.query(
      sql`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = ${table});`
    );
    console.log('1. resultExist = ', resultExist)
    const isExist = resultExist.rows[0].exists;

    let resultCreated
    if (!isExist) {
      resultCreated = await connection.query(sql`CREATE TABLE ${table} (id SERIAL PRIMARY KEY, name VARCHAR(500) NOT NULL, completed BOOLEAN NOT NULL);`);
    }
    console.log('2. resultCreated = ', resultCreated)
  });
};

init();
