import Select from "react-select";
import { SelectOptions } from "../../types";

interface CategoryFilterProps {
  selectedCategory: SelectOptions | null;
  categoryOptionsList: SelectOptions[];
  onChange: (selected: SelectOptions | null) => void;
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  categoryOptionsList,
  onChange,
  className,
}) => (
  <div className="space-y-2">
    <h3 className="font-semibold">Select Category:</h3>
    <Select
      value={selectedCategory}
      onChange={onChange}
      options={categoryOptionsList}
      classNamePrefix="select"
      placeholder="Select a category..."
      isClearable
      className={className}
      styles={{
        option: (provided) => ({
          ...provided,
          color: "black",
        }),
      }}
    />
  </div>
);
