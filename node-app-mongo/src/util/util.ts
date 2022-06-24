import { Rows, RowPropsClient } from "src/types";

export const filterPending = (rows: Rows): RowPropsClient[] =>
  rows.filter((row) => !row.completed);

export const filterCompleted = (rows: Rows): RowPropsClient[] =>
  rows.filter((row) => row.completed);
