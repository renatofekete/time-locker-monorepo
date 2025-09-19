import { useState, useRef, useEffect } from "react";

export interface Option {
  value: string;
  label: string;
}

export interface MultipleSelectProps {
  id?: string;
  label?: string;
  options: Option[];
  value: string[];
  onChange: (selectedValues: string[]) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string | null;
  className?: string;
}

const MultipleSelect = ({
  id,
  label,
  options,
  value = [],
  onChange,
  placeholder = "Select options",
  required = false,
  disabled = false,
  error,
  className = "",
}: MultipleSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((val) => val !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const removeItem = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dropdown toggle
    onChange(value.filter((val) => val !== optionValue));
  };

  const getLabelForValue = (optionValue: string) => {
    const option = options.find((opt) => opt.value === optionValue);
    return option ? option.label : optionValue;
  };

  const toggleAll = () => {
    if (value.length === options.length) {
      onChange([]);
    } else {
      onChange(options.map((option) => option.value));
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={`
          w-full px-3 py-2 border rounded-lg flex flex-wrap items-center cursor-pointer min-h-[42px]
          ${
            isOpen
              ? "ring-2 ring-primary border-transparent"
              : "border-gray-300"
          } 
          ${error ? "border-red-500" : ""}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {value.length === 0 ? (
          <span className="text-gray-500">{placeholder}</span>
        ) : (
          <div className="flex flex-wrap gap-1">
            {value.map((val) => (
              <div
                key={val}
                className="bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-md text-sm flex items-center"
              >
                <span>{getLabelForValue(val)}</span>
                <button
                  type="button"
                  onClick={(e) => removeItem(val, e)}
                  className="ml-1 text-primary hover:text-primary-dark"
                >
                  <span className="sr-only">Remove</span>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 text-gray-400 transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {isOpen && !disabled && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 overflow-auto border border-gray-200">
          <div
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
            onClick={toggleAll}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                checked={value.length === options.length && options.length > 0}
                readOnly
              />
              <span className="ml-2 text-sm font-medium">
                {value.length === options.length
                  ? "Deselect All"
                  : "Select All"}
              </span>
            </div>
          </div>

          {options.map((option) => (
            <div
              key={option.value}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => toggleOption(option.value)}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={value.includes(option.value)}
                  readOnly
                />
                <span className="ml-2 text-sm">{option.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultipleSelect;
