import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { mightFail } from "might-fail";
import z from "zod";
import { db } from "../db";
import { relationships as relationshipsTable } from "../schemas/relationships";
import { eq } from "drizzle-orm";

const createRelationshipSchema = z.object({
  profileNumber: z.number(),
});

export const relationshipsRouter = new Hono()
  .post("/", zValidator("json", createRelationshipSchema), async (c) => {
    const insertValues = c.req.valid("json");
    const { result: relationshipInsertResult } = await mightFail(
      db.insert(relationshipsTable),
    );
  })
  .get("/:userId", async (c) => {
    const userId = c.req.param();
    const { result: relationshipsQueryResult, error: relationshipsQueryError } =
      await mightFail(db.select().from(relationshipsTable));
  });
