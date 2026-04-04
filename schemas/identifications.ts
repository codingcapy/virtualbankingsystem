import {
  pgTable,
  varchar,
  timestamp,
  date,
  index,
  unique,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { profiles } from "./profiles";

export const identifications = pgTable(
  "identifications",
  {
    identificationId: varchar("identification_id").primaryKey(),
    profileId: varchar("profile_id")
      .notNull()
      .references(() => profiles.profileId),
    type: varchar("type", {
      enum: ["drivers_license", "passport", "pr_card", "citizen_card", "other"],
    }).notNull(),
    number: varchar("number", { length: 64 }).notNull(),
    country: varchar("country", { length: 2 }).notNull(),
    issueDate: date("issue_date").notNull(),
    expiryDate: date("expiry_date").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    profileIdx: index("identifications_profile_id_idx").on(table.profileId),
    uniqueIdentification: unique(
      "identifications_type_number_country_unique",
    ).on(table.type, table.number, table.country),
    profileTypeIdx: index("identifications_profile_id_type_idx").on(
      table.profileId,
      table.type,
    ),
  }),
);

export type Identification = InferSelectModel<typeof identifications>;
