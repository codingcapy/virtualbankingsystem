import { Hono } from "hono";

export const profilesRouter = new Hono().post("/", async (c) => {
  return c.json({});
});
