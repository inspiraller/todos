const express = require("express");
const cors = require("cors");
const NodeCache = require( "node-cache" );
const initCache = require('./initCache/index');
const getTodos = require("./getTodos/getTodos");
const postTodo = require("./postTodo/postTodo");

const host = "localhost"; // any url
const port = "80"; // any port



const myCache = initCache(new NodeCache())

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle requests...
getTodos.get({app, myCache});
postTodo.post({app, myCache});

app.listen(port, host, function () {
  console.log("listening on ", host, ":", port);
});
