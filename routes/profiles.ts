import { zValidator } from "@hono/zod-validator";
import { createInsertSchema } from "drizzle-zod";
import { Hono } from "hono";
import z from "zod";
import { profiles as profilesTable } from "../schemas/profiles";
import { relationships as relationshipsTable } from "../schemas/relationships";
import { relationshipProfiles as relationshipProfilesTable } from "../schemas/relationshipProfiles";
import { mightFail } from "might-fail";
import { db } from "../db";
import { randomUUIDv7 } from "bun";
import { HTTPException } from "hono/http-exception";
import { eq, sql } from "drizzle-orm";

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
      const newProfile = profileInsertResult[0];
      if (!newProfile)
        throw new HTTPException(500, {
          message: "Profile creation returned no result",
        });
      const relationshipId = randomUUIDv7();
      const { error: relationshipInsertError } = await mightFail(
        db.insert(relationshipsTable).values({ relationshipId }),
      );
      if (relationshipInsertError)
        throw new HTTPException(500, {
          message: "Error while creating relationship for profile",
          cause: relationshipInsertError,
        });
      const { error: relationshipProfileInsertError } = await mightFail(
        db.insert(relationshipProfilesTable).values({
          relationshipProfileId: randomUUIDv7(),
          profileId: newProfile.profileId,
          relationshipId,
          role: "owner",
        }),
      );
      if (relationshipProfileInsertError)
        throw new HTTPException(500, {
          message: "Error while linking profile to relationship",
          cause: relationshipProfileInsertError,
        });
      return c.json({ profile: newProfile });
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
  })
  .get("/:profileNumber", async (c) => {
    const { profileNumber } = c.req.param();
    const { result: profilesQueryResult, error: profilesQueryError } =
      await mightFail(
        db
          .select()
          .from(profilesTable)
          .where(eq(profilesTable.profileNumber, Number(profileNumber))),
      );
    if (profilesQueryError) {
      throw new HTTPException(500, {
        message: "Error occurred when fetching profile",
        cause: profilesQueryError,
      });
    }
    return c.json({
      profile: profilesQueryResult[0],
    });
  });
