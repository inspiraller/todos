import axios, { AxiosResponse } from "axios";
import { RowPropsClient } from "src/types";
import { PREFIX_PROTOCOL } from "./util";

// TODO: get from .env
export const TODOS_URL_ADD = "/api/todos/post/add";

export interface PropsAdd {
  todoText: string;
}

type TAddTodo = (
  props: PropsAdd
) => Promise<AxiosResponse<RowPropsClient[]>>; // Just return pending

export const addTodo: TAddTodo = (data) =>
  axios.post(`${PREFIX_PROTOCOL}${TODOS_URL_ADD}`, data);
