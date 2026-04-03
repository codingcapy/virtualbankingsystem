import { pgTable, varchar, timestamp, date, index } from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { profiles } from "./profiles";
import { relationships } from "./relationships";

export const relationshipProfiles = pgTable(
  "relationships",
  {
    relationshipProfileId: varchar("relationship_profile_id").primaryKey(),
    profileId: varchar("profile_id")
      .notNull()
      .references(() => profiles.profileId),
    relationshipId: varchar("relationship_id")
      .notNull()
      .references(() => relationships.relationshipId),
    role: varchar("role", { enum: ["owner", "co_owner", "authorized_owner"] })
      .default("owner")
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    profileIdx: index("relationships_profile_id_idx").on(table.profileId),
  }),
);

export type RelationshipProfile = InferSelectModel<typeof relationshipProfiles>;
