import { DateTime } from "luxon";
import PDAClient from "app/api/client";
import Axios, { AxiosResponse } from "axios";

export interface TodoResponse {
  endpoint: string;
  recordId: string;
  data: TodoData;
}

export interface TodoData {
  done: boolean;
  description: string;
}

export interface DeleteTodoResponse {
  message: string;
}

//todo - make example more generic, focus 
export async function getTodos(): Promise<AxiosResponse<TodoResponse[]>> {
  return await PDAClient.get<TodoResponse[]>(`todos`, {
    params: { namespace: "dataswift/starter-app" },
  });
}

export async function addTodo(
  done: boolean,
  description: string,
): Promise<AxiosResponse<TodoResponse>> {
  return await PDAClient.post<TodoResponse>(`todos`, {
    description,
    done,
  }, {
    params: {namespace: "dataswift/starter-app",}
  });
}

export async function updateTodos(
  body: TodoResponse[]
): Promise<AxiosResponse<TodoResponse[]>> {
  return await PDAClient.put<TodoResponse[]>(`todos`, 
    body, { params: { namespace: "dataswift/starter-app", } })
}


//Still cannot get deleteTodo working, so use this method to delete all todos
export async function deleteAllTodos(): Promise<AxiosResponse<DeleteTodoResponse>> {
  return await PDAClient.delete(`todos`, {
    params: { namespace: "dataswift/starter-app" },
  });
}











