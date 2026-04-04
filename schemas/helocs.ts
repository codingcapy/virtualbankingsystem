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
import { collateral } from "./collateral";

export const helocs = pgTable(
  "helocs",
  {
    helocId: varchar("heloc_id").primaryKey(),
    helocNumber: varchar("heloc_number", { length: 12 }).notNull(),
    relationshipId: varchar("relationship_id")
      .notNull()
      .references(() => relationships.relationshipId),
    collateralId: varchar("collateral_id")
      .notNull()
      .references(() => collateral.collateralId),
    creditLimit: bigint("credit_limit", { mode: "number" }).notNull(), // cents, no USD, only CAD supported
    spreadBasisPoints: integer("spread_basis_points"), // null when fixed
    rateType: varchar("rate_type", { enum: ["variable", "fixed"] }).notNull(),
    fixedRateBasisPoints: integer("fixed_rate_basis_points"), // null when variable
    status: varchar("status", { enum: ["active", "inactive", "suspended"] })
      .default("active")
      .notNull(),
    openedDate: date("opened_date").notNull(),
    reviewDate: date("review_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    relationshipIdx: index("helocs_relationship_id_idx").on(
      table.relationshipId,
    ),
    collateralIdx: index("helocs_collateral_id_idx").on(table.collateralId),
    statusIdx: index("helocs_status_idx").on(table.status),
    helocNumberUnique: unique("helocs_heloc_number_unique").on(
      table.helocNumber,
    ),
    relationshipStatusIdx: index("helocs_relationship_id_status_idx").on(
      table.relationshipId,
      table.status,
    ),
  }),
);

export type Heloc = InferSelectModel<typeof helocs>;
