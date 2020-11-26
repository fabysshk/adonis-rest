"use strict";

const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello Addonijs from vercel!!!" };
});
