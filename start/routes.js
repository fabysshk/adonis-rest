"use strict";

const Route = use("Route");

const Todo = (title) => ({
  title,
  completed: false,
});
const todos = new Map();
const addTodo = (todo) => todos.set(todo.title, todo);
const isUnique = (title) => todos.get(title);
Route.get("/", () => {
  return { greeting: "Hello Addonijs from vercel " };
});
Route.get("/todos", () => {
  return {
    todos: [...todos],
  };
});
Route.post("/todos", ({ request, response }) => {
  const title = request.input("title");
  const todo = Todo(title);
  if (isUnique(title)) return { msg: "must be unique" };
  addTodo(todo);
  return {
    todo: todo,
  };
});
Route.group(() => {
  Route.post("/auth/register", "UserController.register");
  Route.post("/auth/login", "UserController.login");
  Route.get("/projects", "ProjectController.index").middleware("auth");
  Route.post("/projects", "ProjectController.create").middleware("auth");
  Route.delete("/projects/:id", "ProjectController.destroy").middleware("auth");
  Route.patch("/projects/:id", "ProjectController.update").middleware("auth");
}).prefix("api/v0");
