import { Express, Request, Response } from "express";
import { Connection } from "mongoose";

import { getBothPendingCompleted, getFromDb } from "../getTodos/getTodos";
import { getConnectedModel } from "../util/mongo";

const url = "/api/todos/post/update";

type TupdateCompleted = (props: {
  connection: Connection;
  table: string;
  completed: boolean;
  id: string | number;
}) => Promise<Document>;
const updateCompleted: TupdateCompleted = ({
  connection,
  table,
  completed,
  id,
}) => {
  const connectedModel = getConnectedModel({ connection, table });
  return new Promise((resolve, reject) => {
    connectedModel.updateOne(
      { id },
      { completed: completed ? new Date().toISOString() : null },
      (err: any, resp: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(resp);
        }
      }
    );
  });
};

interface Props {
  url: string;
  post: (props: {
    app: Express;
    connection: Connection;
    table: string;
  }) => Express;
}
const updateTodo: Props = {
  url,
  post: ({ app, connection, table }) => {
    return app.post(url, async (req: Request, res: Response) => {
      const id = req.body.id || undefined;
      const isCompleted = req.body.completed || false;
      await updateCompleted({ connection, table, completed: isCompleted, id });

      const rows = await getFromDb({ connection, table });
      const rowsBoth = getBothPendingCompleted(rows);

      return res.send(rowsBoth);
    });
  },
};
export default updateTodo;
