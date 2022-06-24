import { Express, Request, Response } from "express";
import { Connection, Types } from "mongoose";
import { resolve } from "path";
import { RowProps, RowPropsClient } from "src/types";
import { getFromDb } from "../getTodos/getTodos";
import { getConnectedModel } from "../util/mongo";
import { filterPending } from "../util/util";

// TODO: get from .env
const url = "/api/todos/post/add";

type Tadd = (props: {
  connection: Connection;
  table: string;
  todoText: string;
}) => Promise<any>;

const addAsSave: Tadd = async ({ connection, table, todoText }) => {
  const connectedModel = getConnectedModel({ connection, table });
  const documentCount = await connectedModel.count({});
  const defaults = { created_timestamp: new Date().toISOString() };
  return new connectedModel({ ...defaults, todoText, id: documentCount }).save();
};

interface Props {
  url: string;
  post: (props: {
    app: Express;
    connection: Connection;
    table: string;
  }) => Express;
}
const addTodo: Props = {
  url,
  post: ({ app, connection, table }) => {
    return app.post(url, async (req: Request, res: Response) => {
      const todoText = req.body?.todoText;
      await addAsSave({ connection, table, todoText });
      const rows = await getFromDb({ connection, table });
      const pending = filterPending(rows);

      return res.send(pending);
    });
  },
};
export default addTodo;
