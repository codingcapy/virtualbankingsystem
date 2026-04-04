import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";

export const relationships = pgTable("relationships", {
  relationshipId: varchar("relationship_id").primaryKey(),
  status: varchar("status", { enum: ["active", "inactive", "suspended"] })
    .default("active")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Relationship = InferSelectModel<typeof relationships>;
