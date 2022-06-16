import express from "express";
import cors from "cors";

import path from "path";
import dotEnv from "dotenv";

import { createPool, DatabasePool, sql } from "slonik";

dotEnv.config({ path: path.resolve(__dirname, "../.env") });

import getTodos from "./getTodos/getTodos";
import postTodo from "./postTodo/postTodo";

const { env } = process;

const PG_DB = env.PG_DB as string;
const PG_USER = env.PG_USER as string;
const PG_PWD = env.PG_PWD as string;
const PG_TABLE = env.PG_TABLE as string;

const host = "localhost"; // any url
const port = 80; // any port

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initServer = (pool: DatabasePool) => {
  getTodos.get({ app,  pool, table: PG_TABLE });
  postTodo.post({ app, pool, table: PG_TABLE });

  app.listen(port, host, function () {
    console.log("listening on ", host, ":", port);
  });
};

const init = () => {
  // postgresql://[user[:password]@][host[:port]][/database name][?name=value[&...]]
  const pool = createPool(
    `postgresql://${PG_USER}:${PG_PWD}@localhost:5432/${PG_DB}`
  );

  pool.connect(async (connection) => {
    try {
      const resultExist = await connection.query(sql`SELECT EXISTS (SELECT FROM pg_tables WHERE tablename  = ${PG_TABLE});`);
      const isExist = resultExist.rows[0].exists;
      if (isExist) {
        initServer(pool)
      }

    } catch (err) {
      console.log(err);
    }
  });
};

init();