import {
  pgTable,
  varchar,
  timestamp,
  index,
  unique,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { relationships } from "./relationships";

export const accounts = pgTable(
  "accounts",
  {
    accountId: varchar("account_id").primaryKey(),
    accountNumber: varchar("account_number", { length: 12 }).notNull(),
    relationshipId: varchar("relationship_id")
      .notNull()
      .references(() => relationships.relationshipId),
    type: varchar("type", {
      enum: ["chequing", "premium_chequing", "saving", "high_interest_saving"],
    }).notNull(),
    currency: varchar("currency", { enum: ["CAD", "USD"] }).notNull(), // ISO (CAD, USD)
    status: varchar("status", { enum: ["active", "inactive", "suspended"] })
      .default("active")
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    relationshipIdx: index("accounts_relationship_id_idx").on(
      table.relationshipId,
    ),
    statusIdx: index("accounts_status_idx").on(table.status),
    accountNumberUnique: unique("accounts_account_number_unique").on(
      table.accountNumber,
    ),
    relationshipStatusIdx: index("accounts_relationship_id_status_idx").on(
      table.relationshipId,
      table.status,
    ),
  }),
);

export type Account = InferSelectModel<typeof accounts>;
