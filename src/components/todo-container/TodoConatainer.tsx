import React from "react";

import { TodoStatus, todoDataType } from "@/model";
import { colorDetective } from "@/utils/helpers";
import { TodoItem, TodoItemProps } from "../todo-item/TodoItem";

type TodoConatainerDataType = {
  taskCount?: number | string;
  title: string;
  items?: todoDataType[];
  todoMode: TodoStatus;
};
const TodoConatainer = (props: TodoConatainerDataType) => {
  const color = {
    title: colorDetective[props.todoMode].title,
    background: colorDetective[props.todoMode].background,
    info: colorDetective[props.todoMode].info,
  };

  return (
    <div
      className={`w-full col-span-1 bg-${color.background} min-h-[720px] bg-opacity-40 rounded-[10px] p-5`}
    >
      <div className="flex justify-between items-center ">
        <b className={`text-${color.title}`}>{props?.title}</b>
        <span className={`text-${color.info}`}> {props?.taskCount} task</span>
      </div>
      <div className="mt-5 flex flex-col gap-4">
        {props.items?.map((item) => (
          <TodoItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default TodoConatainer;
