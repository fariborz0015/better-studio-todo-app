import React from "react";
import Layout from "./layout/Layout";
import TodoConatainer from "@/components/todo-container/TodoConatainer";
import useTodos from "./hooks/useTodos";
import { STATUS_KEY_LABEL } from "./model";

function App() {
  const { todoList } = useTodos();
  console.log(todoList);
  return (
    <Layout>
      <div className="w-full  grid grid-cols-3 gap-5 pt-12">
        {STATUS_KEY_LABEL.map((item) => {
          const items = todoList.filter((todo) => todo.status == item.key);
          return (
            <TodoConatainer
              key={item.key}
              items={items}
              todoMode={item.key}
              title={item.label}
              taskCount={3}
            />
          );
        })}
      </div>
    </Layout>
  );
}

export default App;
