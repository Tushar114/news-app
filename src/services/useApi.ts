import useSWR from "swr";
import axios from "axios";
import { newsApiKey, nYTimesKey, theGuardianAPiKey } from "../constants";
import { SelectOptions } from "../types";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const swrOptions = { revalidateOnFocus: false, dedupingInterval: 60000 };

const endpoints = {
  newsApi: `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${newsApiKey}`,
  nyTimes: `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${nYTimesKey}`,
  guardian: `https://content.guardianapis.com/search?&page-size=20&show-fields=thumbnail&api-key=${theGuardianAPiKey}`,
  nyTimesSections: `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${nYTimesKey}`,
  guardianSections: `https://content.guardianapis.com/sections?api-key=${theGuardianAPiKey}`,
};

export function useFetchNewsApiData() {
  const { data, error } = useSWR(endpoints.newsApi, fetcher, swrOptions);
  return {
    allNewsApiData: data?.articles || [],
    isLoadingNewsApiData: !data && !error,
    isErrorNewsApiData: error,
  };
}

export function useFetchNewYorkTimesArticlesData() {
  const { data, error } = useSWR(endpoints.nyTimes, fetcher, swrOptions);
  return {
    allNewYorkTimesData: data?.results || [],
    isLoadingNewYorkTimesData: !data && !error,
    isErrorNewYorkTimesData: error,
  };
}

export function useFetchTheGuardianData() {
  const { data, error } = useSWR(endpoints.guardian, fetcher, swrOptions);
  return {
    allTheGuardianData: data?.response?.results || [],
    isLoadingTheGuardianData: !data && !error,
    isErrorTheGuardianData: error,
  };
}

export function useFetchSectionsListData() {
  const { data: nyTimesData } = useSWR(
    endpoints.nyTimesSections,
    fetcher,
    swrOptions
  );
  const { data: guardianData } = useSWR(
    endpoints.guardianSections,
    fetcher,
    swrOptions
  );

  return {
    NYTimesSectionListData: nyTimesData?.results || [],
    TheGuardianSectionListData: guardianData?.response?.results || [],
  };
}

export function useFetchSearchResultData(
  searchQuery: string,
  category: string | null,
  selectedSources: Array<SelectOptions>,
  fromDate: string | null,
  toDate: string | null
) {
  // Determine if we should fetch based on any filter being active
  const shouldFetch =
    searchQuery ||
    category ||
    (fromDate && toDate) ||
    (selectedSources.length > 0 && category);

  // Helper function to build URLs based on filters
  const buildUrls = () => {
    // Base parameters for each API
    const newsApiParams = new URLSearchParams();
    const nyTimesParams = new URLSearchParams();
    const guardianParams = new URLSearchParams();

    // Add common parameters
    if (searchQuery) {
      newsApiParams.append("q", searchQuery);
      nyTimesParams.append("q", searchQuery);
      guardianParams.append("q", searchQuery);
    }

    if (category) {
      newsApiParams.append("category", category.toLowerCase());
      // For NY Times, category is part of the path
      guardianParams.append("section", category.toLowerCase());
    }

    if (fromDate) {
      newsApiParams.append("from", fromDate);
      // NY Times uses different date format (YYYYMMDD)
      nyTimesParams.append("begin_date", fromDate.replace(/-/g, ""));
      guardianParams.append("from-date", fromDate);
    }

    if (toDate) {
      newsApiParams.append("to", toDate);
      // NY Times uses different date format (YYYYMMDD)
      nyTimesParams.append("end_date", toDate.replace(/-/g, ""));
      guardianParams.append("to-date", toDate);
    }

    // Add API specific parameters
    newsApiParams.append("pageSize", "100");
    newsApiParams.append("apiKey", newsApiKey);

    nyTimesParams.append("api-key", nYTimesKey);
    nyTimesParams.append("page", "0");

    guardianParams.append("page-size", "100");
    guardianParams.append("show-fields", "thumbnail");
    guardianParams.append("api-key", theGuardianAPiKey);

    return {
      newsApi: category
        ? `https://newsapi.org/v2/top-headlines?${newsApiParams.toString()}&country=us`
        : `https://newsapi.org/v2/everything?${newsApiParams.toString()}`,
      nyTimes: category
        ? `https://api.nytimes.com/svc/news/v3/content/all/${category}.json?${nyTimesParams.toString()}`
        : `https://api.nytimes.com/svc/search/v2/articlesearch.json?${nyTimesParams.toString()}`,
      guardian: `https://content.guardianapis.com/search?${guardianParams.toString()}`,
    };
  };

  const urls = shouldFetch ? buildUrls() : null;

  // Fetch data from all sources
  const { data: newsApiData, error: error1 } = useSWR(
    urls?.newsApi ? urls.newsApi : null,
    fetcher,
    {
      ...swrOptions,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  const { data: nYTimesApiData, error: error2 } = useSWR(
    urls?.nyTimes ? urls.nyTimes : null,
    fetcher,
    {
      ...swrOptions,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  const { data: theGuardianApiData, error: error3 } = useSWR(
    urls?.guardian ? urls.guardian : null,
    fetcher,
    {
      ...swrOptions,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  // Filter data based on selected sources
  let filteredData: Array<any> = [];

  if (selectedSources && selectedSources.length > 0) {
    selectedSources.forEach((source) => {
      switch (source.label) {
        case "News.org":
          if (newsApiData?.articles) {
            filteredData.push(...newsApiData.articles);
          }
          break;
        case "New York Times":
          if (nYTimesApiData?.results || nYTimesApiData?.response?.docs) {
            filteredData.push(
              ...(nYTimesApiData?.results ??
                nYTimesApiData?.response?.docs ??
                [])
            );
          }
          break;
        case "The Guardian":
          if (theGuardianApiData?.response?.results) {
            filteredData.push(...theGuardianApiData.response.results);
          }
          break;
      }
    });
  } else if (shouldFetch) {
    filteredData = [
      ...(newsApiData?.articles ?? []),
      ...(nYTimesApiData?.results ?? nYTimesApiData?.response?.docs ?? []),
      ...(theGuardianApiData?.response?.results ?? []),
    ];
  }

  // Sort results by date
  filteredData.sort((a, b) => {
    const dateA = new Date(a.publishedAt || a.pub_date || a.webPublicationDate);
    const dateB = new Date(b.publishedAt || b.pub_date || b.webPublicationDate);
    return dateB.getTime() - dateA.getTime();
  });

  const isLoading =
    shouldFetch && !newsApiData && !nYTimesApiData && !theGuardianApiData;
  const isError = error1 && error2 && error3;

  return {
    searchResultData: filteredData,
    isSearchResultLoading: isLoading && !isError,
    isSearchResultError: isError,
  };
}
