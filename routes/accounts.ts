import { zValidator } from "@hono/zod-validator";
import { createInsertSchema } from "drizzle-zod";
import { Hono } from "hono";
import { accounts as accountsTable } from "../schemas/accounts";
import { mightFail } from "might-fail";
import { db } from "../db";
import { randomUUIDv7 } from "bun";
import { HTTPException } from "hono/http-exception";
import { assertIsParsableInt } from "../utils";
import { eq } from "drizzle-orm";

export const accountsRouter = new Hono()
  .post(
    "/",
    zValidator(
      "json",
      createInsertSchema(accountsTable).omit({
        accountId: true,
        accountNumber: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      }),
    ),
    async (c) => {
      const insertValues = c.req.valid("json");
      const { result: accountInsertResult, error: accountInsertError } =
        await mightFail(
          db
            .insert(accountsTable)
            .values({ accountId: randomUUIDv7(), ...insertValues })
            .returning(),
        );
      if (accountInsertError)
        throw new HTTPException(500, {
          message: "Error while creating account",
          cause: accountInsertError,
        });
      return c.json({ account: accountInsertResult[0] }, 200);
    },
  )
  .get("/:relationshipNumber", async (c) => {
    const { relationshipNumber: relationshipNumberString } = c.req.param();
    const relationshipNumber = assertIsParsableInt(relationshipNumberString);
    const { result: accountsQueryResult, error: accountsQueryError } =
      await mightFail(
        db
          .select()
          .from(accountsTable)
          .where(eq(accountsTable.relationshipNumber, relationshipNumber)),
      );
    if (accountsQueryError)
      throw new HTTPException(500, {
        message: "Error fetching account",
        cause: accountsQueryError,
      });
    return c.json({ accounts: accountsQueryResult });
  });
