import { pgTable, varchar, timestamp, index } from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { collateral } from "./collateral";
import { termDeposits } from "./termDeposits";

export const termDepositCollateral = pgTable(
  "term_deposit_collateral",
  {
    termDepositCollateralId: varchar("term_deposit_collateral_id").primaryKey(),
    collateralId: varchar("collateral_id")
      .notNull()
      .unique()
      .references(() => collateral.collateralId),
    termDepositId: varchar("term_deposit_id")
      .notNull()
      .unique() // one pledge per term deposit
      .references(() => termDeposits.termDepositId),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    collateralIdx: index("term_deposit_collateral_collateral_id_idx").on(
      table.collateralId,
    ),
    termDepositIdx: index("term_deposit_collateral_term_deposit_id_idx").on(
      table.termDepositId,
    ),
  }),
);

export type TermDepositCollateral = InferSelectModel<
  typeof termDepositCollateral
>;
