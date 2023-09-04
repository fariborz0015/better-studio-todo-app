import React from "react";
import { DONE, TodoStatus, todoDataType } from "@/model";
import { colorDetective } from "@/utils/helpers";
import { TodoItem } from "../todo-item/TodoItem";
import { Icon } from "@iconify/react";
import useTodos from "@/hooks/useTodos";

import { Droppable, Draggable } from "react-beautiful-dnd";
type TodoConatainerDataType = {
  taskCount?: number | string;
  title: string;
  items: todoDataType[];
  todoMode: TodoStatus;
};
const TodoConatainer = (props: TodoConatainerDataType) => {
  const { createTodo, todoList } = useTodos();

  const createNewTodo = () => {
    createTodo({
      body: "New TODO",
      status: props.todoMode,
    });
    let sound = document.querySelector("#blop-audio");
    //@ts-ignore
    sound.play();
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

      <Droppable droppableId={props.todoMode}>
        {(provided, snapshot) => {
          return (
            <div className="mt-5  space-y-4  " {...provided.droppableProps} ref={provided.innerRef}>
              {props.items?.length == 0 ? (
                <div className="w-full text-center text-gray-400">no have any task</div>
              ) : (
                props.items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={todoList.findIndex((x) => x.id == item.id)}
                  >
                    {(DragableProvided, DragableSnapshot) => {
                      if (DragableSnapshot.isDropAnimating) {
                        let sound = document.querySelector("#blop-audio");
                        //@ts-ignore
                        sound.play();
                      }
                      return (
                        <div
                          ref={DragableProvided.innerRef}
                          {...DragableProvided.draggableProps}
                          {...DragableProvided.dragHandleProps}
                          className={`relative  `}
                        >
                          <div
                            className={` bg-${
                              color.info
                            } h-[inherit] absolute rounded  opacity-50  w-full   ${
                              DragableSnapshot.isDropAnimating && ` animate-ping blur-lg`
                            }`}
                          ></div>

                          <TodoItem item={item} key={item.id} />
                        </div>
                      );
                    }}
                  </Draggable>
                ))
              )}
            </div>
          );
        }}
      </Droppable>

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
