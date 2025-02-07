import { useState, useEffect } from "react";
import { SelectOptions } from "../types";

export function useDateFilters() {
  const [filterFromDate, setFilterFromDate] = useState<string | null>(null);
  const [filterToDate, setFilterToDate] = useState<string | null>(null);
  const [filterDateError, setFilterDateError] = useState("");

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

  useEffect(() => {
    const fromDateString = formatDateString(
      selectedFromYear?.value,
      selectedFromMonth?.value,
      selectedFromDay?.value
    );

    const toDateString = formatDateString(
      selectedToYear?.value,
      selectedToMonth?.value,
      selectedToDay?.value
    );

    if (fromDateString && toDateString) {
      const today = new Date().toISOString().split("T")[0];

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

  const clearDateFilters = () => {
    setFilterFromDate(null);
    setFilterToDate(null);
    setFilterDateError("");
    setSelectedFromDay(null);
    setSelectedFromMonth(null);
    setSelectedFromYear(null);
    setSelectedToDay(null);
    setSelectedToMonth(null);
    setSelectedToYear(null);
  };

  return {
    filterFromDate,
    filterToDate,
    filterDateError,
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
    setFilterDateError,
    clearDateFilters,
  };
}

const formatDateString = (
  year: number | undefined,
  month: number | undefined,
  day: number | undefined
): string | null => {
  if (year && month && day) {
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  }
  return null;
};
