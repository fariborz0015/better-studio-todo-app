import { LOCAL_STORAGE_KEY, TodoStatus, todoDataType } from "@/model";
import React, { useState, useEffect } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Todos = {
  todoList: todoDataType[];
  createTodo: (params: createTodoParams) => void;
  updateTodo: (params: updateTodoParams) => void;
  removeTodo: (id: string) => void;
};

type createTodoParams = {
  status: TodoStatus;
  body: any;
  order: number;
};

type updateTodoParams = {
  id: any;
  status: TodoStatus;
  body: any;
  order: number;
};

const time = new Date();
const initialTodos: todoDataType[] = [
  {
    id: time.getTime().toString(),
    status: "todo",
    body: "Start with meditation, exercise & breakfast for a productive day",
    order: 1,
  },
  {
    id: (time.getTime() + 1).toString(),
    status: "todo",
    body: "Start with meditation, exercise & breakfast for a productive day",
    order: 2,
  },
  {
    id: (time.getTime() + 2).toString(),
    status: "done",
    body: "Learn something fresh & relevant",
    order: 3,
  },
  {
    id: (time.getTime() + 3).toString(),
    status: "doing",
    body: "Engage & question in meetings",
    order: 4,
  },
  {
    id: (time.getTime() + 4).toString(),
    status: "doing",
    body: "Use time-blocking for effective days",
    order: 5,
  },
  {
    id: (time.getTime() + 5).toString(),
    status: "todo",
    body: "Finished online course - check!",
    order: 6,
  },
  {
    id: (time.getTime() + 6).toString(),
    status: "done",
    body: "Congratulate yourself for incorporating healthier habits into your lifestyle, like regular exercise or mindful eating",
    order: 7,
  },
];

export const useTodos = create<Todos>()(
  persist(
    (set, get) => ({
      todoList: initialTodos,

      createTodo: ({ status, body, order }: createTodoParams) => {
        set((state) => ({
          todoList: [
            ...state.todoList,
            {
              id: time.getTime().toString(),
              status,
              body,
              order,
            },
          ],
        }));
      },

      updateTodo: ({ body, id, order, status }: updateTodoParams) => {
        set((state) => ({
          todoList: state.todoList.map((todo) =>
            todo.id === id ? { ...todo, body, order, status } : todo,
          ),
        }));
      },

      removeTodo: (id: string) => {
        set((state) => ({
          todoList: state.todoList.filter((todo) => todo.id !== id),
        }));
      },
    }),
    {
      name: LOCAL_STORAGE_KEY, // name of item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default the 'localStorage' is used
    },
  ),
);

export default useTodos;