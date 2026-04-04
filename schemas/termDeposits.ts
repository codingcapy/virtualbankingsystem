import {
  pgTable,
  varchar,
  timestamp,
  index,
  unique,
  bigint,
  integer,
  date,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { relationships } from "./relationships";

export const termDeposits = pgTable(
  "term_deposits",
  {
    termDepositId: varchar("term_deposit_id").primaryKey(),
    termDepositNumber: varchar("term_deposit_number", { length: 12 }).notNull(),
    relationshipId: varchar("relationship_id")
      .notNull()
      .references(() => relationships.relationshipId),
    initialAmount: bigint("initial_amount", { mode: "number" }).notNull(), // cents, no USD, only CAD supported
    rateBasisPoints: integer("rate_basis_points").notNull(), // fixed rate, e.g. 500 = 5.00%
    compoundingFrequency: varchar("compounding_frequency", {
      enum: ["annually", "semi_annually", "quarterly", "monthly"],
    }).notNull(),
    interestPayoutFrequency: varchar("interest_payout_frequency", {
      enum: [
        "at_maturity",
        "annually",
        "semi_annually",
        "quarterly",
        "monthly",
      ],
    }).notNull(),
    renewalInstruction: varchar("renewal_instruction", {
      enum: ["renew", "transfer_to_account", "contact_client"],
    }).notNull(),
    status: varchar("status", { enum: ["active", "inactive", "suspended"] })
      .default("active")
      .notNull(),
    openedDate: date("opened_date").notNull(),
    maturityDate: date("maturity_date").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    relationshipIdx: index("term_deposits_relationship_id_idx").on(
      table.relationshipId,
    ),
    statusIdx: index("term_deposits_status_idx").on(table.status),
    termDepositNumberUnique: unique(
      "term_deposits_term_deposit_number_unique",
    ).on(table.termDepositNumber),
    relationshipStatusIdx: index("term_deposits_relationship_id_status_idx").on(
      table.relationshipId,
      table.status,
    ),
  }),
);

export type TermDeposit = InferSelectModel<typeof termDeposits>;
