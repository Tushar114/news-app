import { MagnifyingGlassIcon, Cog8ToothIcon } from "@heroicons/react/24/solid";

interface HeaderProps {
  isEmptyLocalStorage: boolean;
  onSearchClick: () => void;
  onSettingsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isEmptyLocalStorage,
  onSearchClick,
  onSettingsClick,
}) => (
  <div className="flex items-center justify-between mt-16">
    <div className="flex items-center gap-4">
      <h1 className="text-xl font-bold px-4 py-2 rounded-lg bg-[#34383c] text-white">
        {!isEmptyLocalStorage ? "Personalized News" : "Breaking News"}
      </h1>
    </div>
    <div className="flex items-end justify-between px-4 py-2 rounded-lg bg-[#34383c] text-white w-[25%] md:w-[20%] lg:w-[10%]">
      <button onClick={onSearchClick}>
        <MagnifyingGlassIcon className="h-8 w-8" aria-hidden="true" />
      </button>
      <button onClick={onSettingsClick}>
        <Cog8ToothIcon className="h-8 w-8" aria-hidden="true" />
      </button>
    </div>
  </div>
);

export default Header;
