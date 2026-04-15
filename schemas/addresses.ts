import {
  pgTable,
  varchar,
  timestamp,
  index,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { profiles } from "./profiles";

export const addresses = pgTable(
  "addresses",
  {
    addressId: varchar("address_id").primaryKey(),
    profileNumber: integer("profile_number")
      .notNull()
      .references(() => profiles.profileNumber),
    type: varchar("type", {
      enum: ["home", "mailing", "billing", "other"],
    }).notNull(),
    line1: varchar("line1").notNull(),
    line2: varchar("line2"),
    city: varchar("city", { length: 128 }).notNull(),
    region: varchar("region").notNull(),
    postalCode: varchar("postal_code").notNull(),
    country: varchar("country", { length: 2 }).notNull(),
    isPrimary: boolean("is_primary").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    profileIdx: index("addresses_profile_id_idx").on(table.profileNumber),
  }),
);

export type Address = InferSelectModel<typeof addresses>;
