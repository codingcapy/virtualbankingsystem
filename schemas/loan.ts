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
import { collateral } from "./collateral";

export const loans = pgTable(
  "loans",
  {
    loanId: varchar("loan_id").primaryKey(),
    loanNumber: varchar("loan_number", { length: 12 }).notNull(),
    relationshipId: varchar("relationship_id")
      .notNull()
      .references(() => relationships.relationshipId),
    collateralId: varchar("collateral_id").references(
      () => collateral.collateralId,
    ),
    initialAmount: bigint("initial_amount", { mode: "number" }).notNull(), // cents, no USD, only CAD supported
    spreadBasisPoints: integer("spread_basis_points"), // null when fixed
    flexibility: varchar("flexibility", { enum: ["open", "closed"] }).notNull(),
    rateType: varchar("rate_type", { enum: ["variable", "fixed"] }).notNull(),
    fixedRateBasisPoints: integer("fixed_rate_basis_points"), // null when variable
    status: varchar("status", { enum: ["active", "inactive", "suspended"] })
      .default("active")
      .notNull(),
    originalAmortizationMonths: integer(
      "original_amortization_months",
    ).notNull(),
    paymentFrequency: varchar("payment_frequency", {
      enum: [
        "monthly",
        "semi_monthly",
        "bi_weekly",
        "weekly",
        "accelerated_bi_weekly",
        "accelerated_weekly",
      ],
    }).notNull(),
    openedDate: date("opened_date").notNull(),
    maturityDate: date("maturity_date").notNull(), // end of current term
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    relationshipIdx: index("loans_relationship_id_idx").on(
      table.relationshipId,
    ),
    collateralIdx: index("loans_collateral_id_idx").on(table.collateralId),
    statusIdx: index("loans_status_idx").on(table.status),
    loanNumberUnique: unique("loans_loan_number_unique").on(table.loanNumber),
    relationshipStatusIdx: index("loans_relationship_id_status_idx").on(
      table.relationshipId,
      table.status,
    ),
  }),
);

export type Loan = InferSelectModel<typeof loans>;
