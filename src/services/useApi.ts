import useSWR from "swr";
import axios from "axios";
import { newsApiKey, nYTimesKey, theGuardianAPiKey } from "../constants";
import { SelectOptions } from "../types";

const fetcher = (url) => axios.get(url).then((res) => res.data);
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
  const shouldFetch = searchQuery || category || (fromDate && toDate);

  // Helper function to build URLs based on filters
  const buildUrls = () => {
    // If we have both search query and category
    if (searchQuery && category) {
      return {
        newsApi: `https://newsapi.org/v2/top-headlines?country=us&q=${searchQuery}&category=${category}&pageSize=100&apiKey=${newsApiKey}`,
        nyTimes: `https://api.nytimes.com/svc/news/v3/content/all/${category}.json?q=${searchQuery}&api-key=${nYTimesKey}`,
        guardian: `https://content.guardianapis.com/search?q=${searchQuery}&section=${category}&page-size=100&show-fields=thumbnail&api-key=${theGuardianAPiKey}`,
      };
    }

    // If we only have category
    if (category) {
      return {
        newsApi: `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=100&apiKey=${newsApiKey}`,
        nyTimes: `https://api.nytimes.com/svc/news/v3/content/all/${category}.json?api-key=${nYTimesKey}`,
        guardian: `https://content.guardianapis.com/search?section=${category}&page-size=100&show-fields=thumbnail&api-key=${theGuardianAPiKey}`,
      };
    }

    // If we only have search query and/or date filters
    return {
      newsApi: `https://newsapi.org/v2/everything?${
        searchQuery ? `q=${searchQuery}` : "q="
      }${fromDate ? `&from=${fromDate}` : ""}${
        toDate ? `&to=${toDate}` : ""
      }&pageSize=100&apiKey=${newsApiKey}`,

      nyTimes: `https://api.nytimes.com/svc/search/v2/articlesearch.json?${
        searchQuery ? `q=${searchQuery}` : "q="
      }${fromDate ? `&begin_date=${fromDate.replace(/-/g, "")}` : ""}${
        toDate ? `&end_date=${toDate.replace(/-/g, "")}` : ""
      }&page=0&api-key=${nYTimesKey}`,

      guardian: `https://content.guardianapis.com/search?${
        searchQuery ? `q=${searchQuery}` : "q="
      }${fromDate ? `&from-date=${fromDate}` : ""}${
        toDate ? `&to-date=${toDate}` : ""
      }&page-size=100&show-fields=thumbnail&api-key=${theGuardianAPiKey}`,
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
  let filteredData = [];

  if (selectedSources && selectedSources.length > 0) {
    selectedSources.forEach((source) => {
      switch (source.label) {
        case "News API":
          if (newsApiData?.articles || newsApiData?.results) {
            filteredData.push(
              ...(newsApiData?.articles ?? newsApiData?.results ?? [])
            );
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
      ...(newsApiData?.articles ?? newsApiData?.results ?? []),
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
