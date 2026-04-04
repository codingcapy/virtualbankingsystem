import {
  pgTable,
  varchar,
  timestamp,
  index,
  bigint,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { transactions } from "./transactions";
import { termDeposits } from "./termDeposits";

export const investmentTransactions = pgTable(
  "investment_transactions",
  {
    investmentTransactionId: varchar("investment_transaction_id").primaryKey(),
    transactionId: varchar("transaction_id")
      .notNull()
      .unique()
      .references(() => transactions.transactionId),
    termDepositId: varchar("term_deposit_id")
      .notNull()
      .references(() => termDeposits.termDepositId),
    type: varchar("type", {
      enum: [
        "purchase", // initial term deposit funding
        "interest_payout", // periodic or at-maturity interest payment
        "maturity_payout", // principal returned at maturity
        "early_redemption", // client breaks the term early
        "renewal", // reinvestment at maturity
        "reversal",
      ],
    }).notNull(),
    penaltyAmount: bigint("penalty_amount", { mode: "number" })
      .notNull()
      .default(0), // cents, populated on early_redemption
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    transactionIdx: index("investment_transactions_transaction_id_idx").on(
      table.transactionId,
    ),
    termDepositIdx: index("investment_transactions_term_deposit_id_idx").on(
      table.termDepositId,
    ),
    typeIdx: index("investment_transactions_type_idx").on(table.type),
    termDepositTypeIdx: index(
      "investment_transactions_term_deposit_id_type_idx",
    ).on(table.termDepositId, table.type),
  }),
);

export type InvestmentTransaction = InferSelectModel<
  typeof investmentTransactions
>;
