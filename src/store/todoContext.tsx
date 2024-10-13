import { createContext, useState } from 'react';

export const TodoContext = createContext<{
  todos: {
    todo: string;
    userId: number;
    completed: boolean;
    id: number;
  }[];
  addTodo: (data: {
    todo: string;
    userId: number;
    completed: boolean;
    id: number;
  }) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (
    id: number,
    data: {
      todo: string;
      completed: boolean;
    }
  ) => void;
  addBulkTodos: (data: any) => void;
}>({
  todos: [],
  addBulkTodos: () => {},
  deleteTodo: () => {},
  addTodo: () => {},
  updateTodo: () => {},
});

export const TodoContextProvider = (props: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<
    { todo: string; userId: number; completed: boolean; id: number }[]
  >([]);

  const addTodo = (data: {
    todo: string;
    userId: number;
    completed: boolean;
    id: number;
  }) => {
    const newTodos = [...todos, data];
    setTodos(newTodos);
  };

  const addBulkTodos = (data: any) => {
    setTodos(data);
  };

  const deleteTodo = (id: number) => {
    const filteredTodo = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodo);
  };

  const updateTodo = (
    id: number,
    data: { todo: string; completed: boolean }
  ) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index < 0) {
      return;
    }
    todos[index] = { ...todos[index], ...data };

    setTodos(todos);
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, deleteTodo, updateTodo, addBulkTodos }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
