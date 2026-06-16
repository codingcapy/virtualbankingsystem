import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { mightFail } from "might-fail";
import z from "zod";
import { db } from "../db";
import { relationships as relationshipsTable } from "../schemas/relationships";
import { relationshipProfiles as relationshipProfilesTable } from "../schemas/relationshipProfiles";
import { profiles as profilesTable } from "../schemas/profiles";
import { inArray } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";
import { randomUUIDv7 } from "bun";

const createRelationshipSchema = z.object({
  profiles: z
    .array(
      z.object({
        profileNumber: z.number().int(),
        role: z.enum([
          "owner",
          "co_owner",
          "poa",
          "beneficiary",
          "authorized_user",
        ]),
      }),
    )
    .min(1),
});

export const relationshipsRouter = new Hono()
  .post("/", zValidator("json", createRelationshipSchema), async (c) => {
    const { profiles } = c.req.valid("json");
    const { result: newRelationship, error: transactionError } =
      await mightFail(
        db.transaction(async (tx) => {
          const profileNumbers = profiles.map((p) => p.profileNumber);
          const foundProfiles = await tx
            .select({
              profileId: profilesTable.profileId,
              profileNumber: profilesTable.profileNumber,
            })
            .from(profilesTable)
            .where(inArray(profilesTable.profileNumber, profileNumbers));

          if (foundProfiles.length !== profileNumbers.length) {
            throw new HTTPException(404, {
              message: "One or more profiles not found",
            });
          }

          const profileMap = new Map(
            foundProfiles.map((p) => [p.profileNumber, p.profileId]),
          );

          const relationshipId = randomUUIDv7();
          const [relationship] = await tx
            .insert(relationshipsTable)
            .values({ relationshipId })
            .returning();

          if (!relationship) throw new Error("Failed to create relationship");

          await tx.insert(relationshipProfilesTable).values(
            profiles.map((p) => ({
              relationshipProfileId: randomUUIDv7(),
              profileId: profileMap.get(p.profileNumber)!,
              relationshipId,
              role: p.role,
            })),
          );

          return relationship;
        }),
      );

    if (transactionError) {
      if (transactionError instanceof HTTPException) throw transactionError;
      throw new HTTPException(500, {
        message: "Error creating relationship",
        cause: transactionError,
      });
    }

    return c.json({ relationship: newRelationship }, 201);
  })
  .get("/:profileNumber", async (c) => {
    const { profileNumber } = c.req.param();
    const { result: relationshipsQueryResult, error: relationshipsQueryError } =
      await mightFail(db.select().from(relationshipsTable));
    if (relationshipsQueryError)
      throw new HTTPException(500, {
        message: "Error fetching relationships",
        cause: relationshipsQueryError,
      });
    return c.json({ relationships: relationshipsQueryResult });
  });
