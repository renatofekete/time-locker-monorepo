import { useState, useEffect } from "react";
import Magnifier from "@/assets/icons/Magnifer.svg?react";

type SearchBarProps = {
  value?: string;
  onSearch?: (value: string) => void;
  placeholder?: string;
};

const SearchBar = ({
  value = "",
  onSearch = () => {},
  placeholder = "Track packages",
}: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onSearch(newValue);
  };

  return (
    <div className="mb-3 w-full relative">
      <span className="absolute top-1/2 left-3 -translate-y-1/2">
        <Magnifier />
      </span>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`ps-10 w-full rounded-lg py-3 border-neutral-300/50 border text-sm placeholder-neutral-900/50 focus-visible:outline-1 focus-visible:outline-neutral-300/80`}
      />
    </div>
  );
};

export default SearchBar;
