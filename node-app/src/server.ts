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
import { TemplateLiteral } from "typescript";

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

// function template(strings: TemplateStringsArray, ... expr: string[]) {
//   let str = '';
//   strings.raw.forEach((string, i) => {
//       str += string + (expr[i] || '');
//   });
//   return str as unknown as TemplateLiteral;
// }

const init = () => {
  // postgresql://[user[:password]@][host[:port]][/database name][?name=value[&...]]
  console.log("createPool");
  const pool = createPool(
    `postgresql://${PG_USER}:${PG_PWD}@localhost:5432/${PG_DB}`
  );



  pool.connect(async (connection) => {
    console.log("connect", { PG_TABLE });
    try {
      // const query = {sql: `SELECT * FROM ${PG_TABLE} ORDER BY id ASC;`, type: 'SLONIK_TOKEN_SQL', values: []} as any;
      const query = sql`SELECT * FROM ${sql.identifier([PG_TABLE])} ORDER BY id ASC`


      console.log('other sql formats', {query})
 
      const result = await connection.query(query);

      console.log("LOAD result", result.rows);
    } catch (err) {
      console.log(err);
    }
  });

  initServer(pool);
};

init();
