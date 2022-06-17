import axios from "axios";

import { TtodosResponse } from "./util";

export const TODOS_URL_GET = "/api/todos/get";

type TfetchTodos = (url: string) => Promise<TtodosResponse>;
export const fetchTodos: TfetchTodos = (url) => axios({ url, method: "GET" });

