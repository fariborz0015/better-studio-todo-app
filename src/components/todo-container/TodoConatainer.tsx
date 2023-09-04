import React from "react";

import { DONE, TODO, TodoStatus, todoDataType } from "@/model";
import { colorDetective } from "@/utils/helpers";
import { TodoItem, TodoItemProps } from "../todo-item/TodoItem";
import { Icon } from "@iconify/react";
import useTodos from "@/hooks/useTodos";

type TodoConatainerDataType = {
  taskCount?: number | string;
  title: string;
  items?: todoDataType[];
  todoMode: TodoStatus;
};
const TodoConatainer = (props: TodoConatainerDataType) => {
  const { createTodo } = useTodos();
  const createNewTodo = () => {
    createTodo({
      body: "New TODO",
      order: props.items?.length ?? 99,
      status: props.todoMode,
    });
  };
  const color = {
    title: colorDetective[props.todoMode].title,
    background: colorDetective[props.todoMode].background,
    info: colorDetective[props.todoMode].info,
    action: colorDetective[props.todoMode].action,
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
        {props.items?.length == 0 ? (
          <div className="w-full text-center text-gray-400">no have any task</div>
        ) : (
          props.items?.map((item) => <TodoItem item={item} key={item.id} />)
        )}
      </div>
      {props.todoMode != DONE && (
        <button
          onClick={createNewTodo}
          className={`text-${color.action} text-xs flex items-center gap-1 mt-4 `}
        >
          <Icon icon={"mdi:add"} fontSize={18} />
          <b>New</b>
        </button>
      )}
    </div>
  );
};

export default TodoConatainer;
