import axios, { AxiosResponse } from "axios";
import { PropsTodos, Tid } from "src/types";
import { PREFIX_PROTOCOL } from "./util";

export const TODOS_URL_UPDATE = "/api/todos/post/update";
export interface PropsComplete {
  id: Tid;
  completed: boolean;
}
type TUpdateTodo = (
  props: PropsComplete
) => Promise<AxiosResponse<PropsTodos>>; // Just return pending

export const updateTodo: TUpdateTodo = (data) =>
  axios.post(`${PREFIX_PROTOCOL}${TODOS_URL_UPDATE}`, data);

