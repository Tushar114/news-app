import { SelectOptions } from "../../types";
import { SourceFilter } from "../Filters/SourceFilter";
import { CategoryFilter } from "../Filters/CategoryFilter";

interface SourceSettingsProps {
  selectedSource: readonly SelectOptions[] | SelectOptions;
  selectedCategory: SelectOptions | null;
  categoryOptionsList: SelectOptions[];
  onSourceChange: (selected: readonly SelectOptions[]) => void;
  onCategoryChange: (selected: SelectOptions | null) => void;
  handleSavePreferences: () => void;
}

export const SourceSettings: React.FC<SourceSettingsProps> = ({
  selectedSource,
  selectedCategory,
  categoryOptionsList,
  onSourceChange,
  onCategoryChange,
  handleSavePreferences,
}) => {
  return (
    <div className="grid gap-y-5 gap-x-5 bg-[#34383c] text-white py-6 px-4 rounded-lg">
      <h2 className="text-xl font-bold">Customize Your News Feed</h2>
      <p className="text-base font-bold">
        You can choose your favorite sources and categories
      </p>
      <div className="grid sm:grid-cols-3 gap-4">
        <SourceFilter
          selectedSource={selectedSource}
          onChange={onSourceChange}
          className="col-span-full md:col-span-2"
        />
        <CategoryFilter
          selectedCategory={selectedCategory}
          categoryOptionsList={categoryOptionsList}
          onChange={onCategoryChange}
          className="col-span-full md:col-span-2"
        />
        <div className="col-span-full md:col-span-1 flex items-end">
          <button
            onClick={handleSavePreferences}
            className=" w-full h-[38px] text-xl font-bold bg-white  text-[#34383c] rounded-md col-span-full md:col-span-1 "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
