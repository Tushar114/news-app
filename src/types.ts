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

export interface SearchFiltersProps extends DateRangeFilterProps {
  selectedSource: readonly SelectOptions[];
  selectedCategory: SelectOptions | null;
  categoryOptionsList: Array<SelectOptions>;
  onSourceChange: (selected: readonly SelectOptions[]) => void;
  onCategoryChange: (selected: SelectOptions | null) => void;
}

export interface SelectOptions {
  value: string;
  label: string;
}
export interface INewsItem {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  sectionName: string;
  subsection: string;
  webTitle: string;
  webUrl: string;
  byline:
    | string
    | {
        original: string;
        type: string;
      };
  multimedia: Array<{ url: string }>;
  abstract: string;
  fields: {
    thumbnail: string;
  };
}
