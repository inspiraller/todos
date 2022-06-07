const express = require("express");
const cors = require("cors");
const NodeCache = require( "node-cache" );

const getTodos = require("./getTodos/getTodos");
const postTodo = require("./postTodo/postTodo");

const host = "localhost"; // any url
const port = "80"; // any port


// TODO: get from .env
const urlGet = "/api/todos/get";

const urlPost = "/api/todos/post";
const myCache = new NodeCache();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle requests...
getTodos({app, myCache});
postTodo({app, myCache});

app.listen(port, host, function () {
  console.log("listening on ", host, ":", port);
});
