import Select from "react-select";
import { SelectOptions } from "../../types";
import { sourceOptions } from "../../constants";

interface SourceFilterProps {
  selectedSource: readonly SelectOptions[] | SelectOptions;
  onChange: (selected: readonly SelectOptions[]) => void;
  className?: string;
}

export const SourceFilter: React.FC<SourceFilterProps> = ({
  selectedSource,
  onChange,
  className,
}) => (
  <div className="space-y-2">
    <h3 className="font-semibold">Select Sources:</h3>
    <Select
      isMulti
      isClearable
      value={selectedSource}
      onChange={onChange}
      options={sourceOptions}
      classNamePrefix="select"
      placeholder="Select news sources..."
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
