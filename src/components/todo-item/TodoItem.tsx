import { DONE, TODO, TodoStatus, todoDataType } from "@/model";
import { colorDetective } from "@/utils/helpers";
import React from "react";
import Checkbox from "../checkbox/Checkbox";
import useTodos from "@/hooks/useTodos";
import { Icon } from "@iconify/react";
export interface TodoItemProps {
  item: todoDataType;
}
export const TodoItem = (props: TodoItemProps) => {
  const item = props.item;
  const isDone = item.status == "done";
  const colors = colorDetective[item.status];
  const { updateTodo, removeTodo } = useTodos();
  const removeTodoHandler = () => {
    removeTodo(item.id);
  };
  return (
    <div
      className={`py-3 px-[10px]  group bg-white rounded-[4px] text-xs border-opacity-50 hover:border-opacity-100 transition-all border border-${[
        colors.info,
      ]}`}
    >
      <div className="flex gap-4 items-center ">
        <div className="w-fit">
          <Checkbox
            isChecked={isDone}
            onChange={(e) =>
              updateTodo({
                ...item,
                status: e == true ? DONE : TODO,
              })
            }
          />
        </div>
        {isDone ? (
          <s>{item.body}</s>
        ) : (
          <input
            onChange={(e) =>
              updateTodo({
                ...item,
                body: e.target.value,
              })
            }
            className="w-full min-h-fit break-words"
            value={item.body}
          />
        )}

        <div className=" w-6 ">
          <button
            onClick={removeTodoHandler}
            className={`text-${colors.action} hidden group-hover:block `}
          >
            <Icon icon={"mdi:close"} fontSize={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
