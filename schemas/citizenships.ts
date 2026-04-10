import {
  pgTable,
  varchar,
  timestamp,
  index,
  unique,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { profiles } from "./profiles";

export const citizenships = pgTable(
  "citizenships",
  {
    citizenshipId: varchar("citizenship_id").primaryKey(),
    profileNumber: varchar("profile_number")
      .notNull()
      .references(() => profiles.profileNumber),
    country: varchar("country", { length: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    profileIdx: index("citizenships_profile_number_idx").on(
      table.profileNumber,
    ),
    uniqueCitizenship: unique("citizenships_profile_number_country_unique").on(
      table.profileNumber,
      table.country,
    ),
  }),
);

export type Citizenship = InferSelectModel<typeof citizenships>;
