import {
  pgTable,
  varchar,
  timestamp,
  date,
  index,
  bigint,
  integer,
  unique,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { collateral } from "./collateral";

export const realPropertyCollateral = pgTable(
  "real_property_collateral",
  {
    realPropertyCollateralId: varchar(
      "real_property_collateral_id",
    ).primaryKey(),
    collateralId: varchar("collateral_id")
      .notNull()
      .unique()
      .references(() => collateral.collateralId),

    // Property type
    propertyType: varchar("property_type", {
      enum: [
        "single_family",
        "multi_family",
        "condominium",
        "townhouse",
        "commercial",
        "land",
      ],
    }).notNull(),

    // Address
    line1: varchar("line1").notNull(),
    line2: varchar("line2"),
    city: varchar("city", { length: 128 }).notNull(),
    region: varchar("region").notNull(), // province
    postalCode: varchar("postal_code").notNull(),
    country: varchar("country", { length: 2 }).notNull(),

    // Title
    titleNumber: varchar("title_number").notNull(),
    titleHolder: varchar("title_holder").notNull(), // legal name on title
    titleVerifiedAt: date("title_verified_at").notNull(),

    // Appraisal
    appraisedValue: bigint("appraised_value", { mode: "number" }).notNull(), // cents
    appraisalDate: date("appraisal_date").notNull(),
    appraisedBy: varchar("appraised_by").notNull(), // appraiser name or firm
    nextAppraisalDate: date("next_appraisal_date"),

    // LTV
    ltvBasisPoints: integer("ltv_basis_points").notNull(), // e.g. 8000 = 80.00%

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    collateralIdx: index("real_property_collateral_collateral_id_idx").on(
      table.collateralId,
    ),
    titleNumberIdx: index("real_property_collateral_title_number_idx").on(
      table.titleNumber,
    ),
    appraisalDateIdx: index("real_property_collateral_appraisal_date_idx").on(
      table.appraisalDate,
    ),
    nextAppraisalDateIdx: index(
      "real_property_collateral_next_appraisal_date_idx",
    ).on(table.nextAppraisalDate),
  }),
);

export type RealPropertyCollateral = InferSelectModel<
  typeof realPropertyCollateral
>;
