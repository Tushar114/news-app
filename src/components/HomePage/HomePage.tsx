import { useState, useMemo, useEffect } from "react";
import { SelectOptions } from "../../types";
import { useDateFilters } from "../../hooks/useDateFilters";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { SearchFilters } from "../Filters/SearchFilters";
import { SourceSettings } from "../Filters/SourceSettings";
import { ActiveFilters } from "../Filters/ActiveFilters";
import { Header } from "../Header/Header";
import { ResultsSection } from "../ResultsSection/ResultsSection";

import { newsApiOrgCategoryList } from "../../constants";
import {
  useFetchNewsApiData,
  useFetchNewYorkTimesArticlesData,
  useFetchTheGuardianData,
  useFetchSectionsListData,
  useFetchSearchResultData,
} from "../../services/useApi";
import { filterNews } from "../../utils";
import { SearchBar } from "../SearchBar/SearchBar";

const HomePage: React.FC = () => {
  const { localStorageData, handleSavePreferences } = useLocalStorage();

  const isEmptyLocalStorage = !(
    localStorageData?.selectedCategory &&
    localStorageData.selectedSources.length > 0
  );

  const { filterFromDate, filterToDate, filterDateError, ...dateFilterProps } =
    useDateFilters();

  // UI State
  const [isShowSearchInput, setIsShowSearchInput] = useState(false);
  const [isShowSettings, setIsShowSettings] = useState(false);

  // Search and Filter State
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState<
    readonly SelectOptions[]
  >(localStorageData?.selectedSources || []);
  const [selectedCategory, setSelectedCategory] =
    useState<SelectOptions | null>(localStorageData?.selectedCategory || null);

  useEffect(() => {
    if (localStorageData) {
      setSelectedSource(localStorageData.selectedSources);
      setSelectedCategory(localStorageData.selectedCategory);
    }
  }, [localStorageData]);

  // API Data
  const { allNewsApiData } = useFetchNewsApiData();
  const { allNewYorkTimesData } = useFetchNewYorkTimesArticlesData();
  const { allTheGuardianData } = useFetchTheGuardianData();
  const { NYTimesSectionListData, TheGuardianSectionListData } =
    useFetchSectionsListData();

  // Search Results
  const { searchResultData, isSearchResultLoading, isSearchResultError } =
    useFetchSearchResultData(
      searchQuery,
      selectedCategory?.label.toLowerCase() as string,
      selectedSource as Array<SelectOptions>,
      filterFromDate,
      filterToDate
    );

  // Memoized Values
  const allBreakingNewsData = useMemo(
    () => [...allNewsApiData, ...allNewYorkTimesData, ...allTheGuardianData],
    [allNewsApiData, allNewYorkTimesData, allTheGuardianData]
  );

  const filteredNews = useMemo(
    () =>
      filterNews(
        Array.isArray(selectedSource) ? selectedSource : [selectedSource],
        allBreakingNewsData,
        allNewsApiData,
        allNewYorkTimesData,
        allTheGuardianData
      ),
    [
      selectedSource,
      allBreakingNewsData,
      allNewsApiData,
      allNewYorkTimesData,
      allTheGuardianData,
    ]
  );

  const newsData = useMemo(
    () =>
      searchQuery.length > 0 || filterFromDate || filterToDate
        ? searchResultData
        : filteredNews,
    [searchQuery, filterFromDate, filterToDate, searchResultData, filteredNews]
  );

  const categoryOptionsList = useMemo(() => {
    const allCategories = [
      ...newsApiOrgCategoryList,
      ...TheGuardianSectionListData,
      ...NYTimesSectionListData,
    ];

    return Array.from(new Set(allCategories.map((obj) => obj.id)))
      .map((id) => allCategories.find((obj) => obj.id === id))
      .filter(Boolean)
      .map((category) => ({
        value: category!.id,
        label: category!.webTitle,
      }));
  }, [NYTimesSectionListData, TheGuardianSectionListData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value === "") {
      clearSearchQuery();
      resetFilters();
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query !== "") {
      setSearchQuery(query);
    }
  };

  const handleSourceSelection = (selectedOption: readonly SelectOptions[]) => {
    setSelectedSource(selectedOption);
    setSelectedCategory(null);
  };

  const handleCategorySelection = (selectedOption: SelectOptions | null) => {
    setSelectedCategory(selectedOption);
  };

  const handleSearchButtonClick = () => {
    setIsShowSearchInput(!isShowSearchInput);
    setIsShowSettings(false);
  };

  const handleSettingsButtonClick = () => {
    setIsShowSettings(!isShowSettings);
    setQuery("");
    setSearchQuery("");
    setIsShowSearchInput(false);
    dateFilterProps.clearDateFilters();
  };

  const clearSearchQuery = () => {
    setSearchQuery("");
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    dateFilterProps.clearDateFilters();
  };

  return (
    <div className="py-7 space-y-7 w-full">
      <Header
        isEmptyLocalStorage={isEmptyLocalStorage}
        onSearchClick={handleSearchButtonClick}
        onSettingsClick={handleSettingsButtonClick}
      />

      {isShowSettings && (
        <SourceSettings
          selectedSource={selectedSource}
          selectedCategory={selectedCategory}
          categoryOptionsList={categoryOptionsList}
          onSourceChange={handleSourceSelection}
          onCategoryChange={handleCategorySelection}
          handleSavePreferences={() =>
            handleSavePreferences(selectedSource, selectedCategory)
          }
        />
      )}

      <div className="grid items-center gap-y-5 gap-x-5 md:grid-cols-2 xl:grid-cols-3 mt-20">
        {isShowSearchInput && (
          <SearchBar
            query={query}
            onSubmit={handleSearch}
            onChange={handleInputChange}
          />
        )}

        {isShowSearchInput && (
          <ActiveFilters
            filterDateError={filterDateError}
            filterFromDate={filterFromDate}
            filterToDate={filterToDate}
            onRemoveDateFilter={dateFilterProps.clearDateFilters}
            onRemoveError={() => dateFilterProps.setFilterDateError("")}
          />
        )}

        {searchQuery.length > 0 && (
          <SearchFilters
            {...dateFilterProps}
            selectedSource={selectedSource}
            selectedCategory={selectedCategory}
            categoryOptionsList={categoryOptionsList}
            onSourceChange={handleSourceSelection}
            onCategoryChange={handleCategorySelection}
          />
        )}
      </div>

      <ResultsSection
        isLoading={!!isSearchResultLoading}
        isError={isSearchResultError}
        searchQuery={searchQuery}
        newsData={newsData}
        searchResultData={searchResultData}
      />
    </div>
  );
};

export default HomePage;
