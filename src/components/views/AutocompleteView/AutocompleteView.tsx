"use client";
import { FC } from "react";
import { HiOutlineX } from "react-icons/hi";
import { ImSpinner2 } from "react-icons/im";

export interface AutocompleteOption {
  id: string | number;
  label: string;
}

export interface AutocompleteViewProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSelect: (option: AutocompleteOption) => void;
  onReset: () => void;
  renderOption: (option: AutocompleteOption) => React.ReactNode;
  placeholder?: string;
  isLoading?: boolean;
  isOpen: boolean;
  options: AutocompleteOption[];
  emptyValue?: string;
  name: string;
}

export const AutocompleteView: FC<AutocompleteViewProps> = ({
  value,
  name,
  onChange,
  placeholder,
  onFocus,
  onBlur,
  isLoading,
  isOpen,
  renderOption,
  options = [],
  emptyValue = "Нічого не знайдено",
  onSelect,
  onReset,
}) => {
  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          name={name}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoComplete="off"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <ImSpinner2 className="w-5 h-5 text-blue-500 animate-spin" />
          </div>
        )}
        {value && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onMouseDown={onReset}
          >
            <HiOutlineX className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {!options?.length && !isLoading && (
            <div className="px-4 py-3 text-gray-500 text-sm">{emptyValue}</div>
          )}

          {options?.length > 0 &&
            options.map((option) => (
              <button
                key={option.id}
                className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-3 transition-colors"
                onMouseDown={() => onSelect(option)}
              >
                {renderOption(option)}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};
