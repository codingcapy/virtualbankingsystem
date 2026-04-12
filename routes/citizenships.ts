import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { mightFail } from "might-fail";
import z from "zod";
import { db } from "../db";
import { citizenships as citizenshipsTable } from "../schemas/citizenships";
import { randomUUIDv7 } from "bun";
import { HTTPException } from "hono/http-exception";
import { assertIsParsableInt } from "../utils";
import { eq } from "drizzle-orm";

const createCitizenshipSchema = z.object({
  country: z.string(),
  profileNumber: z.number(),
});

export const citizenshipsRouter = new Hono()
  .post("/", zValidator("json", createCitizenshipSchema), async (c) => {
    const insertValues = c.req.valid("json");
    const { error: citizenshipInsertError, result: citizenshipInsertResult } =
      await mightFail(
        db
          .insert(citizenshipsTable)
          .values({ citizenshipId: randomUUIDv7(), ...insertValues })
          .returning(),
      );
    if (citizenshipInsertError) {
      console.log("Error while creating citizenship");
      console.log(citizenshipInsertError);
      throw new HTTPException(500, {
        message: "Error while creating citizenship",
        cause: citizenshipInsertError,
      });
    }
    return c.json({ citizenship: citizenshipInsertResult[0] }, 200);
  })
  .get("/", async (c) => {
    const { result: citizenshipsQueryResult, error: citizenshipsQueryError } =
      await mightFail(db.select().from(citizenshipsTable));
    if (citizenshipsQueryError)
      throw new HTTPException(500, {
        message: "Error fetching citizenships",
        cause: citizenshipsQueryError,
      });
    return c.json({ citizenships: citizenshipsQueryResult });
  })
  .get("/:profileNumber", async (c) => {
    const { profileNumber: profileNumberString } = c.req.param();
    const profileNumber = assertIsParsableInt(profileNumberString);
    const { result: citizenshipsQueryResult, error: citizenshipsQueryError } =
      await mightFail(
        db
          .select()
          .from(citizenshipsTable)
          .where(eq(citizenshipsTable.profileNumber, profileNumber)),
      );
    if (citizenshipsQueryError)
      throw new HTTPException(500, {
        message: "Error fetching citizenships",
        cause: citizenshipsQueryError,
      });
    return c.json({ citizenships: citizenshipsQueryResult });
  });
