import { pgTable, varchar, timestamp, serial } from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";

export const relationships = pgTable("relationships", {
  relationshipId: varchar("relationship_id").primaryKey(),
  relationshipNumber: serial("relationship_number").unique().notNull(),
  status: varchar("status", { enum: ["active", "inactive", "suspended"] })
    .default("active")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Relationship = InferSelectModel<typeof relationships>;
