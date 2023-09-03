import React from "react";
import Layout from "./layout/Layout";
import TodoConatainer from "./components/todo-container/TodoConatainer";
 

function App() {
  return (
    <Layout>
      <div className="w-full  grid grid-cols-3 gap-5 pt-12">
        <TodoConatainer todoMode="doing" title="todo"  taskCount={3}/>
      </div>
    </Layout>
  );
}

export default App;
