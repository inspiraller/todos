const express = require("express");
const cors = require("cors");
const Pool = require("pg").Pool;

const NodeCache = require("node-cache");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const initCache = require("./initCache/index");
const getTodos = require("./getTodos/getTodos");
const postTodo = require("./postTodo/postTodo");

const { PG_DB, PG_USER, PG_PWD, PG_TABLE } = process.env;

const host = "localhost"; // any url
const port = "80"; // any port

const myCache = initCache(new NodeCache());

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  user: PG_USER,
  host: "localhost",
  database: PG_DB,
  password: PG_PWD,
  port: 5432,
});

pool.query(
  `
CREATE TABLE ${PG_TABLE}(
  id SERIAL PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  completed BOOLEAN NOT NULL);
`,
  (error, results) => {
    if (error) {
      throw error;
    }
    console.log("Create a table", results.rows);

    // handle requests...
    getTodos.get({ app, myCache, pool });
    postTodo.post({ app, myCache });

    app.listen(port, host, function () {
      console.log("listening on ", host, ":", port);
    });
  }
);
