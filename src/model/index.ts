export const TODO = "todo";
export const DOING = "doing";
export const DONE = "done";
export type Todo = "todo";
export type Doing = "doing";
export type Done = "done";

export type TodoStatus = Todo | Doing | Done;
export interface todoDataType {
  id: any;
  status: TodoStatus;
  body: any;
  order: number;
}
