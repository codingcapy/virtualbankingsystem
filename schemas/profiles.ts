import {
  pgTable,
  varchar,
  timestamp,
  date,
  index,
  serial,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";

export const profiles = pgTable(
  "profiles",
  {
    profileId: varchar("profile_id").primaryKey(),
    profileNumber: serial().notNull().unique(),
    firstName: varchar("first_name", { length: 64 }).notNull(),
    middleName: varchar("middle_name", { length: 64 }),
    lastName: varchar("last_name", { length: 64 }).notNull(),
    dateOfBirth: date("date_of_birth").notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
    profilePic: varchar("profile_pic"),
    role: varchar("role", { enum: ["member", "admin"] })
      .default("member")
      .notNull(),
    status: varchar("status", { enum: ["active", "inactive", "suspended"] })
      .default("active")
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index("profiles_email_idx").on(table.email),
    createdAtIdx: index("profiles_created_at_idx").on(table.createdAt),
    phoneIdx: index("profiles_phone_number_idx").on(table.phoneNumber),
  }),
);

export type Profile = InferSelectModel<typeof profiles>;
