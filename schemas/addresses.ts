import {
  pgTable,
  varchar,
  timestamp,
  index,
  boolean,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { profiles } from "./profiles";

export const addresses = pgTable(
  "addresses",
  {
    addressId: varchar("address_id").primaryKey(),
    profileId: varchar("profile_id")
      .notNull()
      .references(() => profiles.profileId),
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
    profileIdx: index("addresses_profile_id_idx").on(table.profileId),
  }),
);

export type Address = InferSelectModel<typeof addresses>;
