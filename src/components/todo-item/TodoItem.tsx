import { TodoStatus, todoDataType } from "@/model";
import { colorDetective } from "@/utils/helpers";
import React from "react";
import Checkbox from "../checkbox/Checkbox";
import useTodos from "@/hooks/useTodos";

export interface TodoItemProps {
  item: todoDataType;
}
export const TodoItem = (props: TodoItemProps) => {
  const isDone = props.item.status == "done";
  const colors = colorDetective[props.item.status];
  const { updateTodo } = useTodos();
  return (
    <div
      className={`py-3 px-[10px]  bg-white rounded-[4px] text-xs border-opacity-50 border border-${[
        colors.info,
      ]}`}
    >
      <div className="flex gap-4 items-center ">
        <div className="w-fit">
          <Checkbox
            isChecked={isDone}
            onChange={(e) =>
              updateTodo({
                ...props.item,
                status: e == true ? "done" : "todo",
              })
            }
          />
        </div>
        {isDone ? <s>{props.item.body}</s> : <input
        className="w-full min-h-fit break-words"
        value={props.item.body} />}
      </div>
    </div>
  );
};
