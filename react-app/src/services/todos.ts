import axios, { AxiosResponse } from "axios";

type TfetchTodos = (url: string) => Promise<TtodosResponse>;

export const fetchTodos: TfetchTodos = (url) => axios({ url, method: "GET" });

// TODO: get from .env
export const TODOS_URL_GET = "//localhost:80/api/todos/get";
export interface PropsTodos {
  todosListPending: string[];
  todosListCompleted: string[];
}
export type TtodosResponse = AxiosResponse<PropsTodos>;
