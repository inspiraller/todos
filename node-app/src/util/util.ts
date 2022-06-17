import { ReadonlyRows, RowPropsClient } from "src/types";

export const filterPending = (rows: ReadonlyRows): RowPropsClient[] =>
  rows.filter((row) => !row.completed).map(({id, todoText}) => ({id, todoText}));

export const filterCompleted = (rows: ReadonlyRows): RowPropsClient[] =>
  rows.filter((row) => row.completed).map(({id, todoText}) => ({id, todoText}));
