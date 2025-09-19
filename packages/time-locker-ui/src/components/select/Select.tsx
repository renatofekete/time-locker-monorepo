import { useState, useRef, useEffect } from "react";

export interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  id?: string;
  label?: string;
  options: Option[];
  value: string;
  onChange: (selectedValue: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

const Select = ({
  id,
  label,
  options,
  value = "",
  onChange,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  error,
  className = "",
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle outside clicks to close dropdown
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

  // Select an option
  const selectOption = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Get label for selected value
  const getSelectedLabel = () => {
    const selectedOption = options.find((opt) => opt.value === value);
    return selectedOption ? selectedOption.label : placeholder;
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
          w-full px-3 py-2 border rounded-lg flex items-center justify-between cursor-pointer min-h-[42px]
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
        <span className={value ? "" : "text-gray-500"}>
          {getSelectedLabel()}
        </span>

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

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {isOpen && !disabled && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 overflow-auto border border-gray-200">
          {options.map((option) => (
            <div
              key={option.value}
              className={`
                px-3 py-2 hover:bg-gray-100 cursor-pointer
                ${
                  option.value === value
                    ? "bg-primary bg-opacity-10 text-primary"
                    : ""
                }
              `}
              onClick={() => selectOption(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
