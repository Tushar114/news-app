import { INewsItem } from "../types";

export const isValidDate = (dateString: string) => {
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
  selectedSources: any,
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

// export const authorOptions = (newsData: INewsItem[]) => {
//   return newsData.map((item) => {
//     const articleAuthor = item.author
//       ? item.author?.substring(0, 30)
//       : typeof item?.source === "object" &&
//         item?.source !== null &&
//         item?.source?.name
//       ? item?.source?.name?.substring(0, 30)
//       : typeof item?.byline === "object" &&
//         item?.byline !== null &&
//         item?.byline?.original
//       ? item?.byline?.original.substring(0, 30)
//       : typeof item?.byline === "string" &&
//         item?.byline !== null &&
//         item?.byline?.length > 0
//       ? item?.byline?.substring(0, 30)
//       : item?.sectionName
//       ? item?.sectionName?.substring(0, 30)
//       : item?.subsection?.substring(0, 30);

//     return {
//       value: articleAuthor,
//       label: articleAuthor,
//     };
//   });
// };
