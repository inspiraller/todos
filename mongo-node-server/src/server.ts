import express from "express";
import cors from "cors";
import mongoose, {  Connection } from "mongoose";

import getTodos from "./getTodos/getTodos";
import addTodo from "./postTodo/addTodo";
// import updateTodo from "./postTodo/updateTodo";

const { env } = process;

const MONGO_DB = env.MONGO_DB as string;
const MONGO_USER = env.MONGO_USER as string;
const MONGO_PASS = env.MONGO_PASS as string;
const MONGO_PORT = env.MONGO_PORT as string;
// const MONGO_HOST = env.MONGO_HOST as string;
const MONGO_COLLECTION = env.MONGO_COLLECTION as string;

const MONGO_HOST='localhost'
const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}`;

const host = "localhost"; // any url
const port = 80; // any port

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initServer = (connection: Connection) => {
  getTodos.get({ app, connection, table: MONGO_COLLECTION });

  addTodo.post({ app, connection, table: MONGO_COLLECTION });
  // updateTodo.post({ app, connection, table: MONGO_COLLECTION });

  app.listen(port, host, function () {
    console.log("listening on ", host, ":", port);
  });
};

const init = async () => {
  await mongoose.connect(MONGO_URI, {
    bufferCommands: false,
  });
  
  const connection = mongoose.connection.useDb(MONGO_DB);
  connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

  initServer(connection);
};

init();
