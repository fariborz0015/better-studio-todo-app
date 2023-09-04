import { DOING, DONE, LOCAL_STORAGE_KEY, TODO, TodoStatus, todoDataType } from "@/model";
import { uniqueId } from "lodash";
import React, { useState, useEffect } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type createTodoParams = {
  status: TodoStatus;
  body: any;
  order?: number;
};

type updateTodoParams = {
  id: any;
  status?: TodoStatus;
  body?: any;
};

type reorderTodosParams = {
  id: any;
  status: TodoStatus;
  startIndex: number;
  endIndex: number;
};

type Todos = {
  todoList: todoDataType[];
  createTodo: (params: createTodoParams) => void;
  createMultiTodo: (todos: createTodoParams[]) => void;
  updateTodo: (params: updateTodoParams) => void;
  removeTodo: (id: string) => void;
  reorderTodos: (params: reorderTodosParams) => void;
};

// Generate a unique timestamp for initial IDs
const time = new Date();

// Define the initial set of todos
const initialTodos: todoDataType[] = [
  {
    id: time.getTime().toString(),
    status: TODO,
    body: "Start with meditation, exercise & breakfast for a productive day",
  },
  {
    id: (time.getTime() + 1).toString(),
    status: TODO,
    body: "Read to learn something new every day",
  },
  {
    id: (time.getTime() + 2).toString(),
    status: TODO,
    body: "Learn something fresh & relevant",
  },
  {
    id: (time.getTime() + 3).toString(),
    status: DOING,
    body: "Engage & question in meetings",
  },
  {
    id: (time.getTime() + 4).toString(),
    status: DOING,
    body: "Use time-blocking for effective days",
  },
  {
    id: (time.getTime() + 5).toString(),
    status: DONE,
    body: "Finished online course - check!!",
  },
  {
    id: (time.getTime() + 6).toString(),
    status: DONE,
    body: "Congratulate yourself for incorporating healthier habits into your lifestyle, like regular exercise or mindful eating",
  },
];

// Create a custom hook for managing todos
const useTodos = create<Todos>()(
  persist(
    (set) => ({
      todoList: initialTodos,
      reorderTodos: ({ endIndex, startIndex, status }) => {
        set((state) => {
          const reorderedList = [...state.todoList];
          const [draggedItem] = reorderedList.splice(startIndex, 1);

          reorderedList.splice(endIndex, 0, {
            ...draggedItem,
            status,
          });

          return { todoList: reorderedList };
        });
      },
      createTodo: ({ status, body }: createTodoParams) => {
        set((state) => {
          const todos = [...state.todoList];
          const lastItem = todos
            .slice()
            .reverse()
            .find((item) => item.status == status);
          const newTodo = {
            id: uniqueId(),
            status,
            body,
          };

          const insertIndex = todos.findIndex((item) => item.id == lastItem?.id) + 1;
          const newArray = todos.slice(0, insertIndex).concat(newTodo, todos.slice(insertIndex));

          return {
            todoList: newArray,
          };
        });
      },
      createMultiTodo: (params: createTodoParams[]) => {
        set((state) => ({
          todoList: [
            ...state.todoList,
            ...params.map((item, index) => ({
              ...item,
              id: `${Date.now() + index}`,
              order: state.todoList.length + 1,
            })),
          ],
        }));
      },
      updateTodo: (params: updateTodoParams) => {
        set((state) => ({
          todoList: state.todoList.map((todo) =>
            todo.id === params.id ? { ...todo, ...params } : todo,
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
      name: LOCAL_STORAGE_KEY,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useTodos;
