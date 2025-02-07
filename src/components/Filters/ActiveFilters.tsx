import { XMarkIcon } from "@heroicons/react/24/solid";

interface ActiveFiltersProps {
  filterDateError: string;
  filterFromDate: string | null;
  filterToDate: string | null;
  onRemoveDateFilter: () => void;
  onRemoveError: () => void;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filterDateError,
  filterFromDate,
  filterToDate,
  onRemoveDateFilter,
  onRemoveError,
}) => {
  if (!filterDateError && !filterFromDate && !filterToDate) {
    return null;
  }

  return (
    <div className="col-span-full flex flex-wrap items-center gap-2">
      {filterDateError ? (
        <div className="flex items-center gap-2 bg-rose-100 text-rose-600 px-3 py-1 rounded-full">
          <span className="text-sm">{filterDateError}</span>
          <button
            onClick={onRemoveError}
            className="p-1 hover:bg-rose-200 rounded-full"
          >
            <XMarkIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : (
        filterFromDate &&
        filterToDate && (
          <div className="flex items-center gap-2 bg-[#34383c] text-white px-3 py-1 rounded-full">
            <span className="text-sm">
              {new Date(filterFromDate).toLocaleDateString()} -{" "}
              {new Date(filterToDate).toLocaleDateString()}
            </span>
            <button
              onClick={onRemoveDateFilter}
              className="p-1 hover:bg-[#004488] rounded-full"
            >
              <XMarkIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )
      )}
    </div>
  );
};
