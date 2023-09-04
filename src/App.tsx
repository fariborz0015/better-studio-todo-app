import React from "react";
import Layout from "./layout/Layout";
import TodoConatainer from "@/components/todo-container/TodoConatainer";
import useTodos from "./hooks/useTodos";
import { STATUS_KEY_LABEL } from "./model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

function App() {
  const { todoList, reorderTodos } = useTodos();
  const onDragEnd = (result: DropResult) => {
    if (result.destination) {
      reorderTodos({
        id: result.draggableId,
        endIndex: result.destination.index,
        //@ts-ignore
        status: result.destination.droppableId,
        startIndex: result.source.index,
      });
    }
  };
  return (
    <Layout>
      <div className="w-full  grid grid-cols-3 gap-5 pt-12">
        <DragDropContext onDragEnd={onDragEnd}>
          {STATUS_KEY_LABEL.map((item) => {
            const items = todoList.filter((todo) => todo.status == item.key);
            return (
              <TodoConatainer
                key={item.key}
                items={items}
                todoMode={item.key}
                title={item.label}
                taskCount={items.length}
              />
            );
          })}
        </DragDropContext>
      </div>
    </Layout>
  );
}

export default App;
