import { SelectOptions } from "../types";
const { NEWS_API_KEY, NEW_YORK_TIMES_KEY, GUARDIAN_API_KEY } = import.meta.env;

export const newsApiKey = NEWS_API_KEY || "6acb6daa1ae641649980df330b572e07";

export const nYTimesKey =
  NEW_YORK_TIMES_KEY || "f2b2hZTOHhG8lqhiQKnQZ54L3aZuacCU";

export const theGuardianAPiKey =
  GUARDIAN_API_KEY || "f12d49ef-b441-41bb-8905-90be3c12b24e";

export const newsApiOrgCategoryList = [
  { id: "general", webTitle: "General" },
  { id: "sports", webTitle: "Sports" },
  { id: "technology", webTitle: "Technology" },
  { id: "entertainment", webTitle: "Entertainment" },
  { id: "science", webTitle: "Science" },
  { id: "health", webTitle: "Health" },
  { id: "business", webTitle: "Business" },
];

export const sourceOptions: SelectOptions[] = [
  { value: "1", label: "News.org" },
  { value: "2", label: "New York Times" },
  { value: "3", label: "The Guardian" },
];

export const dayOptions = Array.from({ length: 30 }, (_, i) => ({
  value: i + 1,
  label: (i + 1).toString(),
}));

export const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: (i + 1).toString(),
}));

export const currentYear = new Date().getFullYear();
export const yearOptions = Array.from({ length: 10 }, (_, i) => ({
  value: currentYear - i,
  label: (currentYear - i).toString(),
}));
