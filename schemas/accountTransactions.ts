import {
  pgTable,
  varchar,
  timestamp,
  index,
  unique,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { transactions } from "./transactions";
import { accounts } from "./accounts";

export const accountTransactions = pgTable(
  "account_transactions",
  {
    accountTransactionId: varchar("account_transaction_id").primaryKey(),
    transactionId: varchar("transaction_id")
      .notNull()
      .unique()
      .references(() => transactions.transactionId),
    accountId: varchar("account_id")
      .notNull()
      .references(() => accounts.accountId),
    type: varchar("type", {
      enum: [
        "deposit",
        "withdrawal",
        "transfer_in",
        "transfer_out",
        "pos_debit",
        "pos_credit",
        "fee",
        "interest_credit",
        "reversal",
      ],
    }).notNull(),
    counterpartyAccountId: varchar("counterparty_account_id").references(
      () => accounts.accountId,
    ), // populated for transfer_in / transfer_out
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    transactionIdx: index("account_transactions_transaction_id_idx").on(
      table.transactionId,
    ),
    accountIdx: index("account_transactions_account_id_idx").on(
      table.accountId,
    ),
    typeIdx: index("account_transactions_type_idx").on(table.type),
    counterpartyIdx: index(
      "account_transactions_counterparty_account_id_idx",
    ).on(table.counterpartyAccountId),
    accountTypeIdx: index("account_transactions_account_id_type_idx").on(
      table.accountId,
      table.type,
    ),
  }),
);

export type AccountTransaction = InferSelectModel<typeof accountTransactions>;
