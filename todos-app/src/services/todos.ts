
import axios, {AxiosResponse} from "axios";

type TfetchTodos = (url: string) => Promise<TtodosResponse>

export const fetchTodos: TfetchTodos = ( url ) => 
  axios({ url, method: "GET" });

export const TODOS_URL_GET = '/api/todos/get';
export interface PropsTodos {
  todosListPending: string[];
  todosListCompleted: string[];
}
export type TtodosResponse = AxiosResponse<PropsTodos>;
