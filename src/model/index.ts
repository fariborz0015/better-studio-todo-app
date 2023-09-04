export const TODO = "todo";
export const DOING = "doing";
export const DONE = "done";

export const LOCAL_STORAGE_KEY = "todos"; // Key for local storage

export const STATUS_KEY_LABEL: {
  key: TodoStatus;
  label: string;
}[] = [
  {
    key: TODO,
    label: "Todo",
  },
  {
    key: DOING,
    label: "Doing 💪",
  },
  {
    key: DONE,
    label: "Done 🎉",
  },
];




export type Todo = "todo";
export type Doing = "doing";
export type Done = "done";

export type TodoStatus = Todo | Doing | Done;
export interface todoDataType {
  id: any;
  status: TodoStatus;
  body: any;
  order?: number;
}
