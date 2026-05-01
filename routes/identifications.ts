import { zValidator } from "@hono/zod-validator";
import { createInsertSchema } from "drizzle-zod";
import { Hono } from "hono";
import { identifications as identificationsTable } from "../schemas/identifications";
import { mightFail } from "might-fail";
import { db } from "../db";
import { randomUUIDv7 } from "bun";
import { HTTPException } from "hono/http-exception";
import { assertIsParsableInt } from "../utils";
import { eq } from "drizzle-orm";

export const identificationsRouter = new Hono()
  .post(
    "/",
    zValidator(
      "json",
      createInsertSchema(identificationsTable).omit({
        identificationId: true,
        createdAt: true,
        updatedAt: true,
      }),
    ),
    async (c) => {
      const insertValues = c.req.valid("json");
      const {
        result: identificationInsertResult,
        error: identificationInsertError,
      } = await mightFail(
        db
          .insert(identificationsTable)
          .values({ identificationId: randomUUIDv7(), ...insertValues })
          .returning(),
      );
      if (identificationInsertError)
        throw new HTTPException(500, {
          message: "Error while creating identification",
          cause: identificationInsertError,
        });
      return c.json({ identification: identificationInsertResult[0] }, 200);
    },
  )
  .get("/:profileNumber", async (c) => {
    const { profileNumber: profileNumberString } = c.req.param();
    const profileNumber = assertIsParsableInt(profileNumberString);
    const {
      result: identificationQueryResult,
      error: identificationQueryError,
    } = await mightFail(
      db
        .select()
        .from(identificationsTable)
        .where(eq(identificationsTable.profileNumber, profileNumber)),
    );
    if (identificationQueryError)
      throw new HTTPException(500, {
        message: "Error fetching identification",
        cause: identificationQueryError,
      });
    return c.json({ identifications: identificationQueryResult });
  });
