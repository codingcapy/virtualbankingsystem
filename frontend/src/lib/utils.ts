import countriesLib from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const START_YEAR = 1900;
export const END_YEAR = new Date().getFullYear();
export const YEARS = Array.from(
  { length: END_YEAR - START_YEAR + 1 },
  (_, i) => START_YEAR + i,
);

countriesLib.registerLocale(en);

export const countries = Object.entries(
  countriesLib.getNames("en", { select: "official" }),
).map(([code, name]) => ({
  value: code,
  label: name,
}));

export const countryMap = Object.fromEntries(
  countries.map((c) => [c.value, c.label]),
);
