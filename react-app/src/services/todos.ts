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

// -------------------------------------
type TAddTodo = (props: { title: string }) => Promise< AxiosResponse<string[]>>; // Just return pending

// TODO: get from .env
export const TODOS_POST_GET = "//localhost:80/api/todos/post";
export const postTodo: TAddTodo = (data) => axios.post(TODOS_POST_GET, data);
