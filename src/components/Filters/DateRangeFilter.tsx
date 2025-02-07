import Select from "react-select";
import { SelectOptions } from "../../types";
import { getDaysInMonth } from "../../utils";

interface DateRangeFilterProps {
  selectedFromDay: SelectOptions | null;
  selectedFromMonth: SelectOptions | null;
  selectedFromYear: SelectOptions | null;
  selectedToDay: SelectOptions | null;
  selectedToMonth: SelectOptions | null;
  selectedToYear: SelectOptions | null;
  setSelectedFromDay: (selected: SelectOptions | null) => void;
  setSelectedFromMonth: (selected: SelectOptions | null) => void;
  setSelectedFromYear: (selected: SelectOptions | null) => void;
  setSelectedToDay: (selected: SelectOptions | null) => void;
  setSelectedToMonth: (selected: SelectOptions | null) => void;
  setSelectedToYear: (selected: SelectOptions | null) => void;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  selectedFromDay,
  selectedFromMonth,
  selectedFromYear,
  selectedToDay,
  selectedToMonth,
  selectedToYear,
  setSelectedFromDay,
  setSelectedFromMonth,
  setSelectedFromYear,
  setSelectedToDay,
  setSelectedToMonth,
  setSelectedToYear,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i).map(
    (year) => ({
      value: year.toString(),
      label: year.toString(),
    })
  );

  const months = Array.from({ length: 12 }, (_, i) => i + 1).map((month) => ({
    value: month.toString(),
    label: new Date(2000, month - 1, 1).toLocaleString("default", {
      month: "long",
    }),
  }));

  const fromDays = getDaysInMonth(
    Number(selectedFromMonth?.value),
    Number(selectedFromYear?.value)
  ).map((day) => ({
    value: day.toString(),
    label: day.toString(),
  }));

  const toDays = getDaysInMonth(
    Number(selectedToMonth?.value),
    Number(selectedToYear?.value)
  ).map((day) => ({
    value: day.toString(),
    label: day.toString(),
  }));

  return (
    <div className="w-full flex col-span-full flex-col">
      <h2 className="text-lg font-bold">Date range:</h2>
      <div className="grid sm:grid-cols-2 gap-4 mt-2">
        <div className="space-y-2">
          <h3 className="font-semibold">From:</h3>
          <div className="grid grid-cols-3 gap-2">
            <Select
              value={selectedFromDay}
              onChange={setSelectedFromDay}
              options={fromDays}
              placeholder="Day"
              isClearable
            />
            <Select
              value={selectedFromMonth}
              onChange={setSelectedFromMonth}
              options={months}
              placeholder="Month"
              isClearable
            />
            <Select
              value={selectedFromYear}
              onChange={setSelectedFromYear}
              options={years}
              placeholder="Year"
              isClearable
            />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">To:</h3>
          <div className="grid grid-cols-3 gap-2">
            <Select
              value={selectedToDay}
              onChange={setSelectedToDay}
              options={toDays}
              placeholder="Day"
              isClearable
            />
            <Select
              value={selectedToMonth}
              onChange={setSelectedToMonth}
              options={months}
              placeholder="Month"
              isClearable
            />
            <Select
              value={selectedToYear}
              onChange={setSelectedToYear}
              options={years}
              placeholder="Year"
              isClearable
            />
          </div>
        </div>
      </div>
    </div>
  );
};
