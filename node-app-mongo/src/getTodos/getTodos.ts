import { Express } from "express";
import { Connection, Schema, Model, Document} from "mongoose";
import { Rows } from "src/types";
import { filterCompleted, filterPending } from "../util/util";

const url = "/api/todos/get";


export const TodosSchema = new Schema({
  id: Number,
  todoText: String,
  created_timestamp: Date,
  completed: Date,
});

type TgetConnectedModel = (props: {
  connection: Connection;
  table: string;
}) => Model<any>  // more performant
// Model<Document<RowProps>>;

const getConnectedModel: TgetConnectedModel = ({ connection, table }) =>
  connection.model(table, TodosSchema);

type TgetFromDb = (props: {
  connection: Connection;
  table: string;
}) => Promise<Rows>  // more performant
// }) => Promise<(Document<RowProps, any, any> & {
//   _id: Types.ObjectId;
// })[]>

const getFromDb: TgetFromDb = async ({ connection, table }) => {
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
