import { TodoStatus, todoDataType } from "@/model";
import React, { useEffect } from "react";
import { create } from "zustand";

// Define the type for your store state
type Todos = {
  todoList: todoDataType[];
  createTodo: (params: createTodoParams) => void;
  editTodo: (params: editTodoParams) => void;
  removeTodo: (id: string) => void;
};

type createTodoParams = {
  status: TodoStatus;
  body: any;
  order: number;
};

type editTodoParams = {
  id: any;
  status: TodoStatus;
  body: any;
  order: number;
};

const LOCAL_STORAGE_KEY = "todos"; // Key for local storage

const initialTodos: todoDataType[] = [
  {
    id: new Date().getTime(),
    status: "doing",
    body: "Sample Todo 1",
    order: 1,
  },
  {
    id: new Date().getTime() + 1,
    status: "doing",
    body: "Sample Todo 2",
    order: 2,
  },
  {
    id: new Date().getTime() + 2,
    status: "doing",
    body: "Sample Todo 3",
    order: 3,
  },
];

const useTodos = create<Todos>((set) => {
  // Initialize the todoList state with initialTodos
  const [todoList, setTodoList] = React.useState<todoDataType[]>(initialTodos);

  // Effect to update local storage whenever todoList changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  return {
    todoList,

    // Create a new todo item
    createTodo: ({ status, body, order }) => {
      const newTodo: todoDataType = {
        id: new Date().getTime(), // Generate a new timestamp-based ID
        status,
        body,
        order, // You can set the order as per your logic
      };

      setTodoList((prevList) => [...prevList, newTodo]);
    },

    // Edit an existing todo item
    editTodo: ({ body, id, order, status }) => {
      setTodoList((prevList) =>
        prevList.map((todo) => (todo.id === id ? { ...todo, body, order, status } : todo)),
      );
    },

    // Remove a todo item by ID
    removeTodo: (id) => {
      setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
    },
  };
});

export default useTodos;
