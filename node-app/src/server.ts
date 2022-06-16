import express from "express";
import cors from "cors";
import NodeCache from "node-cache";

import path from "path";
import dotEnv from "dotenv";

import { createPool, DatabasePool, sql } from "slonik";
import type { QueryResultRow } from "slonik";

dotEnv.config({ path: path.resolve(__dirname, "../.env") });

import initCache from "./initCache/index";
import getTodos from "./getTodos/getTodos";
import postTodo from "./postTodo/postTodo";

const { env } = process;

const PG_DB = env.PG_DB as string;
const PG_USER = env.PG_USER as string;
const PG_PWD = env.PG_PWD as string;
const PG_TABLE = env.PG_TABLE as string;

console.log({ PG_DB, PG_USER, PG_PWD, PG_TABLE });
const host = "localhost"; // any url
const port = 80; // any port

const myCache = initCache(new NodeCache());

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initServer = (pool: DatabasePool) => {
  getTodos.get({ app, myCache, pool, table: PG_TABLE });
  postTodo.post({ app, myCache });

  app.listen(port, host, function () {
    console.log("listening on ", host, ":", port);
  });
};

const init = () => {
  // postgresql://[user[:password]@][host[:port]][/database name][?name=value[&...]]
  console.log("CREATE POOL");
  const pool = createPool(
    `postgresql://${PG_USER}:${PG_PWD}@localhost:5432/${PG_DB}`
  );

  pool.connect(async (connection) => {
    try {
      const resultExist = await connection.query(sql`SELECT EXISTS (SELECT FROM pg_tables WHERE tablename  = ${PG_TABLE});`);
      const isExist = resultExist.rows[0].exists;
      console.log('DB exists =', {isExist})

      // NOTE: Could need to use sql.identifier to reference dynamic table name.
      const resultRows = await connection.query(sql`SELECT * FROM ${sql.identifier([PG_TABLE])} ORDER BY id ASC`);
      console.log('TABLE ROWS EXIST', {resultRows})

    } catch (err) {
      console.log(err);
    }
  });
};

init();