import { createInsertSchema } from "drizzle-zod";
import { Hono } from "hono";
import { addresses as addressesTable } from "../schemas/addresses";
import { zValidator } from "@hono/zod-validator";
import { mightFail } from "might-fail";
import { db } from "../db";
import { randomUUIDv7 } from "bun";
import { HTTPException } from "hono/http-exception";
import { assertIsParsableInt } from "../utils";
import { eq } from "drizzle-orm";

export const addressesRouter = new Hono()
  .post(
    "/",
    zValidator(
      "json",
      createInsertSchema(addressesTable).omit({
        addressId: true,
        createdAt: true,
        updatedAt: true,
      }),
    ),
    async (c) => {
      const insertValues = c.req.valid("json");
      const { result: addressInsertResult, error: addressInsertError } =
        await mightFail(
          db
            .insert(addressesTable)
            .values({ addressId: randomUUIDv7(), ...insertValues })
            .returning(),
        );
      if (addressInsertError)
        throw new HTTPException(500, {
          message: "Error while creating address",
          cause: addressInsertError,
        });
      return c.json({ address: addressInsertResult[0] }, 200);
    },
  )
  .get("/:profileNumber", async (c) => {
    const { profileNumber: profileNumberString } = c.req.param();
    const profileNumber = assertIsParsableInt(profileNumberString);
    const { result: addressesQueryResult, error: addressesQueryError } =
      await mightFail(
        db
          .select()
          .from(addressesTable)
          .where(eq(addressesTable.profileNumber, profileNumber)),
      );
    if (addressesQueryError)
      throw new HTTPException(500, {
        message: "Error fetching addresses",
        cause: addressesQueryError,
      });
    return c.json({ addresses: addressesQueryResult });
  });
