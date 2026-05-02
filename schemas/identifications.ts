import {
  pgTable,
  varchar,
  timestamp,
  date,
  index,
  unique,
  integer,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { profiles } from "./profiles";

export const identifications = pgTable(
  "identifications",
  {
    identificationId: varchar("identification_id").primaryKey(),
    profileNumber: integer("profile_number")
      .notNull()
      .references(() => profiles.profileNumber),
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
    profileIdx: index("identifications_profile_id_idx").on(table.profileNumber),
    uniqueIdentification: unique(
      "identifications_type_number_country_unique",
    ).on(table.type, table.number, table.country),
    profileTypeIdx: index("identifications_profile_id_type_idx").on(
      table.profileNumber,
      table.type,
    ),
  }),
);

export type Identification = InferSelectModel<typeof identifications>;
