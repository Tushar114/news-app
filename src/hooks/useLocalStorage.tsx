import { useState, useEffect } from "react";
import { SelectOptions } from "../types";

interface UserPreferences {
  selectedSources: readonly SelectOptions[];
  selectedCategory: SelectOptions | null;
}

export function useLocalStorage() {
  const [localStorageData, setLocalStorageData] =
    useState<UserPreferences | null>(null);

  useEffect(() => {
    const storedPreferences = localStorage.getItem("userPreferences");
    if (storedPreferences) {
      const parsedData = JSON.parse(storedPreferences);
      setLocalStorageData(parsedData);
    }
  }, []);

  const handleSavePreferences = (
    sources: readonly SelectOptions[],
    category: SelectOptions | null
  ) => {
    const preferences: UserPreferences = {
      selectedSources: sources,
      selectedCategory: category,
    };

    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    setLocalStorageData(preferences);
  };

  return {
    localStorageData,
    handleSavePreferences,
  };
}
