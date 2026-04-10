import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { mightFail } from "might-fail";
import z from "zod";
import { db } from "../db";
import { citizenships as citizenshipsTable } from "../schemas/citizenships";
import { randomUUIDv7 } from "bun";
import { HTTPException } from "hono/http-exception";

const createCitizenshipSchema = z.object({
  country: z.string(),
  profileNumber: z.string(),
});

export const citizenshipsRouter = new Hono().post(
  "/",
  zValidator("json", createCitizenshipSchema),
  async (c) => {
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
    return c.json({ citizenshipResult: citizenshipInsertResult[0] }, 200);
  },
);
