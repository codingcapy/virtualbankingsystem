import {
  pgTable,
  varchar,
  timestamp,
  date,
  index,
  boolean,
  bigint,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { profiles } from "./profiles";

export const employments = pgTable(
  "employments",
  {
    employmentId: varchar("employment_id").primaryKey(),
    profileId: varchar("profile_id")
      .notNull()
      .references(() => profiles.profileId),
    employerName: varchar("employer_name", { length: 64 }).notNull(),
    position: varchar("position", { length: 64 }).notNull(),
    annualIncome: bigint("annual_income", { mode: "number" }).notNull(), // cents
    startDate: date("start_date"),
    endDate: date("end_date"),
    isCurrent: boolean("is_current").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    profileIdx: index("employments_profile_id_idx").on(table.profileId),
  }),
);

export type Employment = InferSelectModel<typeof employments>;
