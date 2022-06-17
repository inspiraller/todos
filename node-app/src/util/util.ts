import { ReadonlyRows, RowProps, RowPropsClient } from "src/types";

export const filterPending = (rows: ReadonlyRows): RowPropsClient[] =>
  rows.filter((row) => !row.completed).map(({completed, ...rest}) => rest);

export const filterCompleted = (rows: ReadonlyRows): RowPropsClient[] =>
  rows.filter((row) => row.completed).map(({completed, ...rest}) => rest);
