import { INewsItem, SelectOptions } from "../types";

export const isValidDate = (dateString: string | null) => {
  if (dateString === null) {
    return false;
  }
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (!regex.test(dateString)) {
    return false;
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return false;
  }

  return true;
};

export const filterNews = (
  selectedSources: Array<SelectOptions>,
  allBreakingNewsData: INewsItem[],
  allNewsApiData: INewsItem[],
  allNewYorkTimesData: INewsItem[],
  allTheGuardianData: INewsItem[]
) => {
  if (
    !selectedSources ||
    selectedSources.length === 0 ||
    selectedSources.length === 3
  ) {
    return allBreakingNewsData;
  }

  let filteredNews: INewsItem[] = [];
  selectedSources.forEach((source: any) => {
    if (source.value === 1) {
      filteredNews = [...filteredNews, ...allNewsApiData];
    } else if (source.value === 2) {
      filteredNews = [...filteredNews, ...allNewYorkTimesData];
    } else if (source.value === 3) {
      filteredNews = [...filteredNews, ...allTheGuardianData];
    }
  });

  return filteredNews;
};

export const getDaysInMonth = (month: number, year: number): number[] => {
  if (!month || !year) return Array.from({ length: 31 }, (_, i) => i + 1);

  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};
