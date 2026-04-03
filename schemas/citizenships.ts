import { pgTable, varchar, timestamp, index } from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { profiles } from "./profiles";

export const citizenships = pgTable(
  "citizenships",
  {
    citizenshipId: varchar("citizenship_id").primaryKey(),
    profileId: varchar("profile_id")
      .notNull()
      .references(() => profiles.profileId),
    country: varchar("country", { length: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    profileIdx: index("citizenships_profile_id_idx").on(table.profileId),
  }),
);

export type Citizenship = InferSelectModel<typeof citizenships>;
