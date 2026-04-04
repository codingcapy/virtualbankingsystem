import {
  pgTable,
  varchar,
  timestamp,
  index,
  bigint,
  unique,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { loanTransactions } from "./loanTransactions";

export const loanPaymentAllocations = pgTable(
  "loan_payment_allocations",
  {
    allocationId: varchar("allocation_id").primaryKey(),
    loanTransactionId: varchar("loan_transaction_id")
      .notNull()
      .unique()
      .references(() => loanTransactions.loanTransactionId),
    principalAmount: bigint("principal_amount", { mode: "number" })
      .notNull()
      .default(0), // cents
    interestAmount: bigint("interest_amount", { mode: "number" })
      .notNull()
      .default(0), // cents
    feesAmount: bigint("fees_amount", { mode: "number" }).notNull().default(0), // cents
    penaltyAmount: bigint("penalty_amount", { mode: "number" })
      .notNull()
      .default(0), // cents
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    loanTransactionIdx: index(
      "loan_payment_allocations_loan_transaction_id_idx",
    ).on(table.loanTransactionId),
  }),
);

export type LoanPaymentAllocation = InferSelectModel<
  typeof loanPaymentAllocations
>;
