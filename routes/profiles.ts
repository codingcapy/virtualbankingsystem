import { zValidator } from "@hono/zod-validator";
import { createInsertSchema } from "drizzle-zod";
import { Hono } from "hono";
import z from "zod";
import { profiles as profilesTable } from "../schemas/profiles";
import { mightFail } from "might-fail";
import { db } from "../db";
import { randomUUIDv7 } from "bun";
import { HTTPException } from "hono/http-exception";
import { sql } from "drizzle-orm";

export const profilesRouter = new Hono()
  .post(
    "/",
    zValidator(
      "json",
      createInsertSchema(profilesTable).omit({
        profileId: true,
        profileNumber: true,
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
  )
  .get("/", async (c) => {
    const PAGE_SIZE = 250;
    const page = Math.max(Number(c.req.query("page")) || 1, 1);
    const offset = (page - 1) * PAGE_SIZE;
    const [
      { result: profiles, error: profilesError },
      { result: countResult, error: countError },
    ] = await Promise.all([
      mightFail(
        db.select().from(profilesTable).limit(PAGE_SIZE).offset(offset),
      ),
      mightFail(
        db.select({ count: sql<string>`count(*)` }).from(profilesTable),
      ),
    ]);
    if (profilesError)
      throw new HTTPException(500, {
        message: "Error fetching profiles",
        cause: profilesError,
      });
    if (countError)
      throw new HTTPException(500, {
        message: "Error counting profiles",
        cause: countError,
      });
    const total = Number(countResult?.[0]?.count ?? 0);
    const totalPages = Math.ceil(total / PAGE_SIZE);
    return c.json({ profiles, page, pageSize: PAGE_SIZE, total, totalPages });
  });
