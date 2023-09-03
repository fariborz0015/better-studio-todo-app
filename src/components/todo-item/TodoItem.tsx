 
import { TodoStatus } from "@/model";
import React from "react";

export interface TodoItemProps {
  status: TodoStatus;
  body: any;
}
export const TodoItem = () => {
  return <div>TodoItem</div>;
};
