import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface SearchBarProps {
  query: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onSubmit,
  onChange,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="col-span-full w-full flex items-center"
    >
      <div className="relative w-full">
        <input
          required
          placeholder="Search innoscripta news"
          value={query}
          onChange={onChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#34383c] focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-100"
        >
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-500"
            aria-hidden="true"
          />
        </button>
      </div>
    </form>
  );
};
