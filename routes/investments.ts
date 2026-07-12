import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";
import { assertIsParsableInt } from "../utils";
import { mightFail } from "might-fail";
import { db } from "../db";
import { investmentTransactions } from "../schemas/investmentTransactions";

const createInvestmentSchema = z.object({
  relationshipNumber: z.number(),
  type: z.string(),
  currency: z.string(),
});

export const investmentsRouter = new Hono()
  .post(
    "/termdeposit/",
    zValidator("json", createInvestmentSchema),
    async (c) => {
      const insertValues = c.req.valid("json");
    },
  )
  .get("/:profileNumber", async (c) => {
    const { profileNumber: profileNumberString } = c.req.param();
    const profileNumber = assertIsParsableInt(profileNumberString);
  });
