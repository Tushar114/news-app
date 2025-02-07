import { SearchFiltersProps } from "../../types";
import { DateRangeFilter } from "./DateRangeFilter";
import { SourceFilter } from "./SourceFilter";
import { CategoryFilter } from "./CategoryFilter";

export const SearchFilters = ({
  selectedSource,
  selectedCategory,
  categoryOptionsList,
  onSourceChange,
  onCategoryChange,
  ...dateFilterProps
}: SearchFiltersProps) => (
  <>
    <DateRangeFilter {...dateFilterProps} />
    <div className="grid sm:grid-cols-2 gap-4">
      <SourceFilter selectedSource={selectedSource} onChange={onSourceChange} />
      <CategoryFilter
        selectedCategory={selectedCategory}
        categoryOptionsList={categoryOptionsList}
        onChange={onCategoryChange}
      />
    </div>
  </>
);
