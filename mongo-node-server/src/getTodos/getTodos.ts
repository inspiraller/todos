import { Express } from "express";
import { Connection } from "mongoose";
import { Rows,  } from "src/types";
import { getConnectedModel } from "../util/mongo";
import { filterCompleted, filterPending } from "../util/util";

const url = "/api/todos/get";


type TgetFromDb = (props: {
  connection: Connection;
  table: string;
}) => Promise<Rows>  // more performant
// }) => Promise<(Document<RowProps, any, any> & {
//   _id: Types.ObjectId;
// })[]>

export const getFromDb: TgetFromDb = async ({ connection, table }) => {
  const connectedModel = getConnectedModel({ connection, table });
  const result = await connectedModel.find()
  return result as unknown as Rows; 
};

export const getBothPendingCompleted = (rows: Rows) => {
  const pending = filterPending(rows);
  const completed = filterCompleted(rows);
  return { pending, completed };
};
interface Props {
  url: string;
  get: (props: {
    app: Express;
    connection: Connection;
    table: string;
  }) => Express;
}

const getTodos: Props = {
  url,
  get: ({ app, connection, table }) => {
    return app.get(url, async (req, res) => {
      const rows = await getFromDb({ connection, table });

      const pending = filterPending(rows);
      const completed = filterCompleted(rows);

      return res.send({pending, completed});
    });
  },
};
export default getTodos;
