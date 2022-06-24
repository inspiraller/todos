import { Types} from "mongoose";

export interface RowProps {
  id?: number;
  todoText: string;
  created_timestamp: string;
  completed?: string;
}
export interface RowPropsClient extends RowProps {
  _id?: Types.ObjectId;
}

export type Rows = RowPropsClient[]

