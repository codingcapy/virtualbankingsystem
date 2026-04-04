import {
  pgTable,
  varchar,
  timestamp,
  index,
  unique,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { profiles } from "./profiles";
import { relationships } from "./relationships";

export const relationshipProfiles = pgTable(
  "relationship_profiles",
  {
    relationshipProfileId: varchar("relationship_profile_id").primaryKey(),
    profileId: varchar("profile_id")
      .notNull()
      .references(() => profiles.profileId),
    relationshipId: varchar("relationship_id")
      .notNull()
      .references(() => relationships.relationshipId),
    role: varchar("role", {
      enum: ["owner", "co_owner", "poa", "beneficiary", "authorized_user"],
    }).notNull(),
    status: varchar("status", { enum: ["active", "inactive", "suspended"] })
      .default("active")
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    profileIdx: index("relationship_profiles_profile_id_idx").on(
      table.profileId,
    ),
    relationshipIdx: index("relationship_profiles_relationship_id_idx").on(
      table.relationshipId,
    ),
    uniqueMembership: unique(
      "relationship_profiles_profile_id_relationship_id_unique",
    ).on(table.profileId, table.relationshipId),
  }),
);

export type RelationshipProfile = InferSelectModel<typeof relationshipProfiles>;
