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
  Route.get("/projects/:id", "ProjectController.find").middleware("auth");
  Route.post("/projects", "ProjectController.create").middleware("auth");
  Route.delete("/projects/:id", "ProjectController.destroy").middleware("auth");
  Route.patch("/projects/:id", "ProjectController.update").middleware("auth");

  Route.get("/projects/:id/tasks", "TaskController.index").middleware("auth");
  Route.post("/projects/:id/tasks", "TaskController.create").middleware("auth");

  Route.delete("/tasks/:id", "TaskController.destroy").middleware("auth");
  Route.get("/tasks/:id", "TaskController.find").middleware("auth");
  Route.patch("/tasks/:id", "TaskController.update").middleware("auth");

  Route.get("/musics", "MusicController.index");
  Route.post("/musics", "MusicController.create").middleware("auth");
  Route.get("/musics/me", "MusicController.me").middleware("auth");
  Route.delete("/musics/:id", "MusicController.destroy").middleware("auth");
}).prefix("api/v0");
