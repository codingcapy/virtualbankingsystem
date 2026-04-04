import { zValidator } from "@hono/zod-validator";
import { createInsertSchema } from "drizzle-zod";
import { Hono } from "hono";
import z from "zod";
import { profiles as profilesTable } from "../schemas/profiles";
import { mightFail } from "might-fail";
import { db } from "../db";
import { randomUUIDv7 } from "bun";
import { HTTPException } from "hono/http-exception";

export const profilesRouter = new Hono().post(
  "/",
  zValidator(
    "json",
    createInsertSchema(profilesTable).omit({
      profileId: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    }),
  ),
  async (c) => {
    const insertValues = c.req.valid("json");
    const { result: profileInsertResult, error: profileInsertError } =
      await mightFail(
        db
          .insert(profilesTable)
          .values({ profileId: randomUUIDv7(), ...insertValues })
          .returning(),
      );
    if (profileInsertError)
      throw new HTTPException(500, {
        message: "Error while creating profile",
        cause: profileInsertError,
      });
    return c.json({ profile: profileInsertResult[0] });
  },
);
