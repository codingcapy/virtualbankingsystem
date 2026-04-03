import { pgTable, varchar, timestamp, date, index } from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { profiles } from "./profiles";

export const relationships = pgTable(
  "relationships",
  {
    relationshipId: varchar("relationship_id").primaryKey(),
    profileId: varchar("profile_id")
      .notNull()
      .references(() => profiles.profileId),
    status: varchar("status", { enum: ["active", "inactive", "suspended"] })
      .default("active")
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    profileIdx: index("relationships_profile_id_idx").on(table.profileId),
  }),
);

export type Relationship = InferSelectModel<typeof relationships>;
