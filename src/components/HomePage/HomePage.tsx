import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import {
  XMarkIcon,
  MagnifyingGlassIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";
import {
  useFetchNewsApiData,
  useFetchNewYorkTimesArticlesData,
  useFetchTheGuardianData,
  useFetchSearchResultData,
  useFetchSectionsListData,
} from "../../services/useApi";
import NewsList from "../NewsList/NewsList";
import { NewsSkeleton } from "../NewsSkeleton/NewsSkeleton";
import { ScrollButton } from "../ScrollToTopButton/ScrollToTopButton";
import { filterNews } from "../../utils";
import { SelectOptions } from "../../types";
import {
  dayOptions,
  monthOptions,
  newsApiOrgCategoryList,
  sourceOptions,
  yearOptions,
} from "../../constants";

const HomePage: React.FC = () => {
  const [localStorageData, setLocalStorageData] = useState<any[]>([]);
  const isEmptyLocalStorage = localStorageData.every(
    (element) =>
      (Array.isArray(element) && element?.length === 0) || element === null
  );
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState<
    readonly SelectOptions[] | SelectOptions
  >([]);
  const [selectedCategory, setSelectedCategory] =
    useState<SelectOptions | null>(null);

  const [selectedFromDay, setSelectedFromDay] = useState<SelectOptions | null>(
    null
  );
  const [selectedFromMonth, setSelectedFromMonth] =
    useState<SelectOptions | null>(null);
  const [selectedFromYear, setSelectedFromYear] =
    useState<SelectOptions | null>(null);
  const [selectedToDay, setSelectedToDay] = useState<SelectOptions | null>(
    null
  );
  const [selectedToMonth, setSelectedToMonth] = useState<SelectOptions | null>(
    null
  );
  const [selectedToYear, setSelectedToYear] = useState<SelectOptions | null>(
    null
  );
  const [filterFromDate, setFilterFromDate] = useState<string | null>(null);
  const [filterToDate, setFilterToDate] = useState<string | null>(null);
  const [filterDateError, setFilterDateError] = useState("");

  const [isShowSearchInput, setIsShowSearchInput] = useState(false);
  const [isShowSettings, setIsShowSettings] = useState(false);

  const { allNewsApiData } = useFetchNewsApiData();

  const { allNewYorkTimesData } = useFetchNewYorkTimesArticlesData();
  const { allTheGuardianData } = useFetchTheGuardianData();

  const allBreakingNewsData = useMemo(
    () => [...allNewsApiData, ...allNewYorkTimesData, ...allTheGuardianData],
    [allNewsApiData, allNewYorkTimesData, allTheGuardianData]
  );

  const filteredNews = useMemo(
    () =>
      filterNews(
        selectedSource,
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

  const { searchResultData, isSearchResultLoading, isSearchResultError } =
    useFetchSearchResultData(
      searchQuery,
      selectedCategory?.label.toLowerCase() as string,
      selectedSource as Array<SelectOptions>,
      filterFromDate,
      filterToDate
    );

  const { NYTimesSectionListData, TheGuardianSectionListData } =
    useFetchSectionsListData();

  const guardianSectionsList = TheGuardianSectionListData?.map(
    ({ id, webTitle }: { id: string; webTitle: string }) => ({ id, webTitle })
  );

  const renamedNYTimesSectionListDataKeys = NYTimesSectionListData?.map(
    ({ section, display_name }: { section: string; display_name: string }) => ({
      id: section,
      webTitle: display_name,
    })
  );

  const allCategories = [
    ...newsApiOrgCategoryList,
    ...guardianSectionsList,
    ...renamedNYTimesSectionListDataKeys,
  ];

  const uniqueCategoriesArray = Array.from(
    new Set(allCategories.map((obj) => obj.id))
  ).map((id) => {
    return allCategories.find((obj) => obj.id === id);
  });

  const newsData = useMemo(() => {
    if (searchQuery.length > 0 || filterFromDate || filterToDate) {
      return searchResultData;
    }
    return filteredNews;
  }, [
    searchQuery,
    filterFromDate,
    filterToDate,
    searchResultData,
    filteredNews,
  ]);

  function getDataFromStorage(): [] {
    return JSON.parse(localStorage.getItem("favNews") ?? "[]");
  }

  useEffect(() => {
    setLocalStorageData(getDataFromStorage());
  }, []);

  useEffect(() => {
    if (localStorageData.length > 0) {
      setSelectedSource(localStorageData[0]);
      setSelectedCategory(localStorageData[1]);
    }
  }, [localStorageData]);

  const NYTimesSectionListItems = [];

  for (let i = 0; i < NYTimesSectionListData?.length; i++) {
    NYTimesSectionListItems.push({
      value: NYTimesSectionListData[i].section,
      label: NYTimesSectionListData[i].display_name,
    });
  }

  const TheGuardianSectionListItems = [];

  for (let i = 0; i < TheGuardianSectionListData?.length; i++) {
    TheGuardianSectionListItems.push({
      value: TheGuardianSectionListData[i].id,
      label: TheGuardianSectionListData[i].webTitle,
    });
  }

  const categoryOptionsList = [];

  for (let i = 0; i < uniqueCategoriesArray?.length; i++) {
    categoryOptionsList.push({
      value: uniqueCategoriesArray[i].id,
      label: uniqueCategoriesArray[i].webTitle,
    });
  }

  useEffect(() => {
    if (query === "") {
      setSearchQuery("");
    }
  }, [query]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const value = e.target.value;
    setQuery(value);
    if (value === "") {
      clearSearchQuery();
      // Reset filters but keep them visible
      setSelectedCategory(null);
      setFilterFromDate(null);
      setFilterToDate(null);
      setSelectedFromDay(null);
      setSelectedFromMonth(null);
      setSelectedFromYear(null);
      setSelectedToDay(null);
      setSelectedToMonth(null);
      setSelectedToYear(null);
    }
  }

  const handleCategorySelection = (selectedOption: SelectOptions | null) => {
    setSelectedCategory(selectedOption);
  };

  const handleSourceSelection = (selectedOption: readonly SelectOptions[]) => {
    setSelectedSource(selectedOption);
    setSelectedCategory(null);
  };

  const handleFromDayChange = (selectedOption: SelectOptions | null) => {
    setSelectedFromDay(selectedOption);
  };

  const handleFromMonthChange = (selectedOption: SelectOptions | null) => {
    setSelectedFromMonth(selectedOption);
  };

  const handleFromYearChange = (selectedOption: SelectOptions | null) => {
    setSelectedFromYear(selectedOption);
  };

  const handleToDayChange = (selectedOption: SelectOptions | null) => {
    setSelectedToDay(selectedOption);
  };

  const handleToMonthChange = (selectedOption: SelectOptions | null) => {
    setSelectedToMonth(selectedOption);
  };

  const handleToYearChange = (selectedOption: SelectOptions | null) => {
    setSelectedToYear(selectedOption);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query !== "") {
      setSearchQuery(query);
    }
  };

  const clearSearchQuery = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    const fromDay = selectedFromDay?.value;
    const fromMonth = selectedFromMonth?.value;
    const fromYear = selectedFromYear?.value;

    const toDay = selectedToDay?.value;
    const toMonth = selectedToMonth?.value;
    const toYear = selectedToYear?.value;

    const fromDateString =
      fromYear && fromMonth && fromDay
        ? `${fromYear}-${fromMonth.toString().padStart(2, "0")}-${fromDay
            .toString()
            .padStart(2, "0")}`
        : null;

    const toDateString =
      toYear && toMonth && toDay
        ? `${toYear}-${toMonth.toString().padStart(2, "0")}-${toDay
            .toString()
            .padStart(2, "0")}`
        : null;

    const today = new Date().toISOString().split("T")[0];

    if (fromDateString && toDateString) {
      if (fromDateString > toDateString) {
        setFilterDateError("From date cannot be greater than To date");
        return;
      } else if (fromDateString > today || toDateString > today) {
        setFilterDateError("Cannot select future dates");
        return;
      } else {
        setFilterDateError("");
        setFilterFromDate(fromDateString);
        setFilterToDate(toDateString);
      }
    }
  }, [
    selectedFromDay,
    selectedFromMonth,
    selectedFromYear,
    selectedToDay,
    selectedToMonth,
    selectedToYear,
  ]);

  const handleRemoveDateFilter = () => {
    setFilterFromDate("");
    setFilterToDate("");
    setSelectedFromDay(null);
    setSelectedFromMonth(null);
    setSelectedFromYear(null);
    setSelectedToDay(null);
    setSelectedToMonth(null);
    setSelectedToYear(null);
  };

  const handleRemoveDateFilterError = () => {
    setFilterDateError("");
  };

  const handleSaveFavorite = () => {
    localStorage.setItem(
      "favNews",
      JSON.stringify([selectedSource, selectedCategory])
    );
    setLocalStorageData([selectedSource, selectedCategory]);
  };

  const handleSearchButtonClick = () => {
    setIsShowSearchInput(!isShowSearchInput);
    setIsShowSettings(false);
  };

  const handleSettingsButtonClick = () => {
    setIsShowSettings(!isShowSettings);
    setSearchQuery("");
    setIsShowSearchInput(false);
  };

  return (
    <div className="py-7 space-y-7 w-full">
      <div className="flex items-center justify-between mt-16">
        <h1 className="text-xl font-bold px-4 py-2 rounded-lg bg-[#003366] text-white">
          {!isEmptyLocalStorage ? "My Favorite Articles" : "Breaking News"}
        </h1>
        <div className="flex items-end justify-between px-4 py-2 rounded-lg bg-[#003366] text-white w-[25%] md:w-[20%] lg:w-[10%]">
          <button onClick={handleSearchButtonClick}>
            <MagnifyingGlassIcon className="h-8 w-8" aria-hidden="true" />
          </button>
          <button onClick={handleSettingsButtonClick}>
            <Cog8ToothIcon className="h-8 w-8" aria-hidden="true" />
          </button>
        </div>
      </div>
      {isShowSettings && (
        <div className="grid  gap-y-5 gap-x-5  bg-[#003366] text-white py-6 px-4 rounded-lg ">
          <p className="text-base font-bold">
            You can choose your favorite sources and categories
          </p>
          <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-4">
            <Select
              value={selectedSource}
              onChange={handleSourceSelection}
              options={sourceOptions}
              placeholder="Select a source"
              isClearable
              isMulti
              className="col-span-full md:col-span-2"
              styles={{
                option: (provided) => ({
                  ...provided,
                  color: "black",
                }),
              }}
            />
            <Select
              value={selectedCategory}
              onChange={handleCategorySelection}
              options={categoryOptionsList}
              placeholder="Select a category"
              isClearable
              isDisabled={!!filterToDate && filterToDate.length > 0}
              className="col-span-full md:col-span-2"
              styles={{
                option: (provided) => ({
                  ...provided,
                  color: "black",
                }),
              }}
            />
            <button
              onClick={handleSaveFavorite}
              className="text-xl p-2 md:p-1 font-bold bg-white  text-[#003366] rounded-md col-span-full md:col-span-1"
            >
              Save
            </button>
          </div>
        </div>
      )}
      <div className="grid items-center gap-y-5 gap-x-5 md:grid-cols-2 xl:grid-cols-3 mt-20">
        {isShowSearchInput && (
          <form
            onSubmit={(e) => handleSearch(e)}
            className="col-span-full w-full flex items-center"
          >
            <input
              required
              placeholder="Search innoscripta news"
              className="w-[80%] py-2 px-3 rounded rounded-l-md border border-[#ccc] box-border min-h-[38px] col-span-full xl:col-auto focus:border-2 outline-[#2684ff] focus:shadow-sm-[#2684ff] font-sans placeholder:text-[#808080] placeholder:text-lg font-normal"
              value={query}
              type="text"
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="w-[20%] text-xl font-bold bg-[#C20017] border border-[#C20017] min-h-[38px] p-1.5 text-white rounded-r-md"
            >
              Search
            </button>
          </form>
        )}

        {filterDateError.length === 0 && filterFromDate && filterToDate && (
          <div className="w-fit flex justify-between items-center p-2 rounded-sm text-lg font-semibold bg-[#C20017]">
            <h4 className="text-base text-white font-normal">
              From: {filterFromDate} to:{filterToDate}
            </h4>
            <button onClick={handleRemoveDateFilter}>
              <XMarkIcon
                className="h-5 w-5 ml-2 text-white"
                aria-hidden="true"
              />
            </button>
          </div>
        )}

        {filterDateError.length > 0 && (
          <div className="w-fit flex justify-between items-center p-2 rounded-sm text-lg font-semibold bg-[#C20017]">
            <h4 className="text-base text-white font-normal">
              {filterDateError}
            </h4>
            <button onClick={handleRemoveDateFilterError}>
              <XMarkIcon
                className="h-5 w-5 ml-2 text-white"
                aria-hidden="true"
              />
            </button>
          </div>
        )}

        {searchQuery.length > 0 && searchResultData?.length >= 0 && (
          <>
            <div className="w-full flex col-span-full flex-col">
              <h2 className="text-lg font-bold">Date range:</h2>
              <div className="w-full grid sm:grid-cols-2 gap-4">
                <div className="col-span-full sm:col-span-1">
                  <h2>From Date</h2>
                  <div className="grid grid-cols-3 gap-2">
                    <Select
                      value={selectedFromMonth}
                      onChange={handleFromMonthChange}
                      options={monthOptions}
                      placeholder="MM"
                    />
                    <Select
                      value={selectedFromDay}
                      onChange={handleFromDayChange}
                      options={dayOptions}
                      placeholder="DD"
                    />
                    <Select
                      value={selectedFromYear}
                      onChange={handleFromYearChange}
                      options={yearOptions}
                      placeholder="YYYY"
                    />
                  </div>
                </div>
                <div className="col-span-full sm:col-span-1">
                  <h2>To date</h2>
                  <div className="grid grid-cols-3 gap-2">
                    <Select
                      value={selectedToMonth}
                      onChange={handleToMonthChange}
                      options={monthOptions}
                      placeholder="MM"
                    />
                    <Select
                      value={selectedToDay}
                      onChange={handleToDayChange}
                      options={dayOptions}
                      placeholder="DD"
                    />
                    <Select
                      value={selectedToYear}
                      onChange={handleToYearChange}
                      options={yearOptions}
                      placeholder="YYYY"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex col-span-full flex-col mt-4">
              <div className="w-full grid sm:grid-cols-2 gap-4">
                <div className="col-span-full sm:col-span-1">
                  <h2 className="text-lg font-bold">Select Source</h2>
                  <Select
                    value={selectedSource}
                    onChange={handleSourceSelection}
                    options={sourceOptions}
                    placeholder="Select Source"
                    className={"col-span-full sm:col-span-1"}
                    isMulti
                    isClearable
                  />
                </div>
                <div className="col-span-full sm:col-span-1">
                  <h2 className="text-lg font-bold">Select Category</h2>
                  <Select
                    value={selectedCategory}
                    onChange={handleCategorySelection}
                    options={categoryOptionsList}
                    placeholder="Select Category"
                    className={"col-span-full sm:col-span-1"}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {isSearchResultLoading && (
        <div className="mt-3">
          <NewsSkeleton />
        </div>
      )}

      {isSearchResultError && (
        <div className="flex flex-col items-center justify-between text-rose-600 text-lg mt-20">
          <pre>Oops! Something went wrong</pre>
          <pre>Please try again later.</pre>
        </div>
      )}

      {/* Show "no results" message when search returns empty results */}
      {searchQuery.length > 0 &&
        !isSearchResultLoading &&
        searchResultData?.length === 0 && (
          <p className="col-span-full text-lg font-bold text-center">
            There were no articles found with this search.
            <br /> Please try another.
          </p>
        )}

      {!isSearchResultLoading && newsData && newsData.length > 0 && (
        <>
          <NewsList items={newsData} />
          <ScrollButton />
        </>
      )}
    </div>
  );
};

export default HomePage;
