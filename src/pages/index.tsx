import { type NextPage } from "next";

import { api } from "../utils/api";
import { useState } from "react";

const Home: NextPage = () => {
  const [formData, setFormData] = useState("");

  const todos = api.todo.getAll.useQuery();

  const createTodoQuery = api.todo.create.useMutation();
  const deleteTodoQuery = api.todo.delete.useMutation();
  const toggleTodoQuery = api.todo.toggle.useMutation();

  const submitTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTodoQuery
      .mutateAsync({ title: formData })
      .then(() => todos.refetch());
  };

  const deleteTodo = async (id: string) => {
    console.log(id);
    await deleteTodoQuery.mutateAsync({ id }).then(() => todos.refetch());
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    await toggleTodoQuery
      .mutateAsync({ id, completed })
      .then(() => todos.refetch());
  };

  return (
    <>
      <div className="mt-12 ml-12">
        <ul className="flex-col">
          {todos.data?.map((todo) => (
            <li className="mb-2 flex space-x-4" key={todo.id}>
              <p className="my-auto">{todo.title}</p>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  void toggleTodo(todo.id, !todo.completed);
                }}
              ></input>
              <button
                onClick={() => {
                  void deleteTodo(todo.id);
                }}
                className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <form
          onSubmit={(e) => {
            void submitTodo(e);
          }}
        >
          <input
            onChange={(e) => {
              setFormData(e.target.value);
            }}
            type="text"
            placeholder="Add a new todo"
          />
          <button className="rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700">
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default Home;
