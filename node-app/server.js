const express = require("express");
const cors = require("cors");

const host = "localhost"; // any url
const port = "80"; // any port


// TODO: get from .env
const urlGet = "/api/todos/get";
const mockTodos = {
  todosListPending: ["example pending item"],
  todosListCompleted: ["exmaple completed item"],
};

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get(urlGet, (req, res) => {
  return res.send(mockTodos);
});

app.listen(port, host, function () {
  console.log("listening on ", host, ":", port);
});
