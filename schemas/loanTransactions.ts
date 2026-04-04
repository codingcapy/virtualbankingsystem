import {
  pgTable,
  varchar,
  timestamp,
  date,
  index,
  bigint,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { transactions } from "./transactions";

export const loanTransactions = pgTable(
  "loan_transactions",
  {
    loanTransactionId: varchar("loan_transaction_id").primaryKey(),
    transactionId: varchar("transaction_id")
      .notNull()
      .unique()
      .references(() => transactions.transactionId),
    loanType: varchar("loan_type", {
      enum: ["mortgage", "heloc", "loc"],
    }).notNull(),
    loanId: varchar("loan_id").notNull(), // FK to mortgages, helocs, or linesOfCredit depending on loanType
    type: varchar("type", {
      enum: [
        "regular_payment",
        "lump_sum_payment",
        "draw", // heloc / loc only
        "interest_charge",
        "fee_charge",
        "reversal",
      ],
    }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    transactionIdx: index("loan_transactions_transaction_id_idx").on(
      table.transactionId,
    ),
    loanIdIdx: index("loan_transactions_loan_id_idx").on(table.loanId),
    loanTypeIdx: index("loan_transactions_loan_type_idx").on(table.loanType),
    loanIdTypeIdx: index("loan_transactions_loan_id_loan_type_idx").on(
      table.loanId,
      table.loanType,
    ),
    typeIdx: index("loan_transactions_type_idx").on(table.type),
  }),
);

export type LoanTransaction = InferSelectModel<typeof loanTransactions>;
