import express from "express";
import cors from "cors";
import NodeCache from "node-cache";

import path from "path";
import dotEnv from "dotenv";

import { sql, DataIntegrityError, createPool } from "slonik";
import type { DatabasePool } from "slonik";

dotEnv.config({ path: path.resolve(__dirname, "../.env") });

import initCache from "./initCache/index";
import getTodos from "./getTodos/getTodos";
import postTodo from "./postTodo/postTodo";
// import { createTableIfNotExist } from "./db/createTableIfNotExist";

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
  getTodos.get({ app, myCache, pool });
  postTodo.post({ app, myCache });

  app.listen(port, host, function () {
    console.log("listening on ", host, ":", port);
  });
};

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
    console.log("query", query);
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

const createTableIfNotExist = async (
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
  });
};

const init = () => {
  // postgresql://[user[:password]@][host[:port]][/database name][?name=value[&...]]
  const pool = createPool(
    `postgresql://${PG_USER}:${PG_PWD}@localhost:5432/${PG_DB}`
  );

  pool.connect(async (connection) => {
    try {
      const result = await connection.query(
        sql`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = ${PG_TABLE});`
      );
      const isExist = result.rows[0].exists;


      // DONT WRAP IN CONNECTION AGAIN
      const result2 = await connection.query(query);
      console.log("2. createTable", { result2 });
    } catch (err) {
      console.log(err);
    }
  });
  // createTableIfNotExist(pool, initServer);
};

init();
