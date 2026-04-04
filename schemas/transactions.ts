import {
  pgTable,
  varchar,
  timestamp,
  date,
  index,
  unique,
  bigint,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { relationships } from "./relationships";
import { profiles } from "./profiles";

export const transactions = pgTable(
  "transactions",
  {
    transactionId: varchar("transaction_id").primaryKey(),
    transactionNumber: varchar("transaction_number", { length: 12 }).notNull(),
    relationshipId: varchar("relationship_id")
      .notNull()
      .references(() => relationships.relationshipId),
    initiatedByProfileId: varchar("initiated_by_profile_id")
      .notNull()
      .references(() => profiles.profileId),
    type: varchar("type", {
      enum: [
        "account_transaction",
        "loan_transaction",
        "investment_transaction",
      ],
    }).notNull(),
    amount: bigint("amount", { mode: "number" }).notNull(), // cents, always positive
    currency: varchar("currency", { enum: ["CAD", "USD"] }).notNull(),
    status: varchar("status", {
      enum: ["pending", "posted", "reversed", "failed"],
    })
      .default("pending")
      .notNull(),
    postedAt: timestamp("posted_at"),
    effectiveDate: date("effective_date").notNull(),
    reversalOfTransactionId: varchar("reversal_of_transaction_id").references(
      (): any => transactions.transactionId,
    ),
    transferPairTransactionId: varchar(
      "transfer_pair_transaction_id",
    ).references((): any => transactions.transactionId),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    relationshipIdx: index("transactions_relationship_id_idx").on(
      table.relationshipId,
    ),
    initiatedByProfileIdx: index("transactions_initiated_by_profile_id_idx").on(
      table.initiatedByProfileId,
    ),
    statusIdx: index("transactions_status_idx").on(table.status),
    typeIdx: index("transactions_type_idx").on(table.type),
    postedAtIdx: index("transactions_posted_at_idx").on(table.postedAt),
    effectiveDateIdx: index("transactions_effective_date_idx").on(
      table.effectiveDate,
    ),
    transactionNumberUnique: unique(
      "transactions_transaction_number_unique",
    ).on(table.transactionNumber),
    reversalIdx: index("transactions_reversal_of_transaction_id_idx").on(
      table.reversalOfTransactionId,
    ),
    transferPairIdx: index("transactions_transfer_pair_transaction_id_idx").on(
      table.transferPairTransactionId,
    ),
  }),
);

export type Transaction = InferSelectModel<typeof transactions>;
