import { Schema, Connection, Model} from "mongoose";

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

export const getConnectedModel: TgetConnectedModel = ({ connection, table }) =>
  connection.model(table, TodosSchema);