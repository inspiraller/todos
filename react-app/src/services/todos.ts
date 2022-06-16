import axios, { AxiosResponse } from "axios";

type TfetchTodos = (url: string) => Promise<TtodosResponse>;

export const fetchTodos: TfetchTodos = (url) => axios({ url, method: "GET" });

export const prefixProtocol = '//localhost:80';

// TODO: get from .env
export const TODOS_URL_GET = "/api/todos/get";
export interface PropsTodos {
  pending: string[];
  completed: string[];
}
export type TtodosResponse = AxiosResponse<PropsTodos>;

// -------------------------------------
type TAddTodo = (props: { todoText: string }) => Promise< AxiosResponse<string[]>>; // Just return pending

// TODO: get from .env
export const TODOS_URL_POST = "/api/todos/post";
export const postTodo: TAddTodo = (data) => axios.post(`${prefixProtocol}${TODOS_URL_POST}`, data);
