import { INewsItem } from "../../types";
import NewsList from "../NewsList/NewsList";
import { NewsSkeleton } from "../NewsSkeleton/NewsSkeleton";
import { ScrollButton } from "../ScrollToTopButton/ScrollToTopButton";

interface ResultsSectionProps {
  isLoading: boolean;
  isError: boolean;
  searchQuery: string;
  newsData: INewsItem[];
  searchResultData: INewsItem[];
  isShowingFavorites: boolean;
  localStorageData: INewsItem[];
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  isLoading,
  isError,
  searchQuery,
  newsData,
  searchResultData,
  isShowingFavorites,
  localStorageData,
}) => {
  if (isLoading) {
    return <NewsSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-between text-rose-600 text-lg mt-20">
        <pre>Oops! Something went wrong</pre>
        <pre>Please try again later.</pre>
      </div>
    );
  }

  if (isShowingFavorites && localStorageData.length === 0) {
    return (
      <p className="col-span-full text-lg font-bold text-center mt-4">
        No favorite articles saved yet.
      </p>
    );
  }

  if (searchQuery.length > 0 && searchResultData?.length === 0) {
    return (
      <p className="col-span-full text-lg font-bold text-center mt-4">
        There were no articles found with this search.
        <br /> Please try different search criteria.
      </p>
    );
  }

  if (newsData && newsData.length > 0) {
    return (
      <>
        <NewsList items={newsData} />
        <ScrollButton />
      </>
    );
  }

  return null;
};
