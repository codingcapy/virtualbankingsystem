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

export const linesOfCredit = pgTable(
  "lines_of_credit",
  {
    locId: varchar("loc_id").primaryKey(),
    locNumber: varchar("loc_number", { length: 12 }).notNull(),
    relationshipId: varchar("relationship_id")
      .notNull()
      .references(() => relationships.relationshipId),
    creditLimit: bigint("credit_limit", { mode: "number" }).notNull(), // cents, no USD, only CAD supported
    spreadBasisPoints: integer("spread_basis_points").notNull(), // no fixed rate, LOCs are always based on prime
    status: varchar("status", { enum: ["active", "inactive", "suspended"] })
      .default("active")
      .notNull(),
    openedDate: date("opened_date").notNull(),
    reviewDate: date("review_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    relationshipIdx: index("locs_relationship_id_idx").on(table.relationshipId),
    statusIdx: index("locs_status_idx").on(table.status),
    locNumberUnique: unique("locs_loc_number_unique").on(table.locNumber),
    relationshipStatusIdx: index("locs_relationship_id_status_idx").on(
      table.relationshipId,
      table.status,
    ),
  }),
);

export type LineOfCredit = InferSelectModel<typeof linesOfCredit>;
