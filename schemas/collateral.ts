import { pgTable, varchar, timestamp, index } from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";

export const collateral = pgTable(
  "collateral",
  {
    collateralId: varchar("collateral_id").primaryKey(),
    type: varchar("type", {
      enum: ["real_property", "term_deposit", "personal_property", "guarantee"],
    }).notNull(),
    status: varchar("status", {
      enum: ["active", "released", "under_review"],
    })
      .default("active")
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    typeIdx: index("collateral_type_idx").on(table.type),
    statusIdx: index("collateral_status_idx").on(table.status),
  }),
);

export type Collateral = InferSelectModel<typeof collateral>;
