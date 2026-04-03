import {
  pgTable,
  varchar,
  timestamp,
  index,
  integer,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { relationships } from "./relationships";

export const accounts = pgTable(
  "accounts",
  {
    accountId: varchar("account_id").primaryKey(),
    relationshipId: varchar("relationship_id")
      .notNull()
      .references(() => relationships.relationshipId),
    type: varchar("type", {
      enum: ["chequing", "premium_chequing", "saving", "high_interest_saving"],
    }).notNull(),
    currency: varchar("currency", { length: 3 }).notNull(), // ISO (CAD, USD)
    balance: integer("balance").notNull().default(0), // cents
    fee: integer("fee").notNull().default(0), // cents
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
  }),
);

export type Account = InferSelectModel<typeof accounts>;
