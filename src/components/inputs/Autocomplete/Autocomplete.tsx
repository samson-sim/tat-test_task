"use client";
import { FC, useState } from "react";
import { Controller, useFormContext, useController } from "react-hook-form";
import {
  AutocompleteOption,
  AutocompleteView,
  AutocompleteViewProps,
} from "../../views";

interface AutocompleteProps
  extends Omit<
    AutocompleteViewProps,
    | "value"
    | "onChange"
    | "onFocus"
    | "onBlur"
    | "onReset"
    | "isOpen"
    | "onSelect"
  > {
  name: string;
  onChange?: (value: string) => void;
}

export const Autocomplete: FC<AutocompleteProps> = ({
  name,
  options,
  onChange,
  ...rest
}) => {
  const { control } = useFormContext();
  const { field } = useController({ control, name });

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  const handleChangeInputValue = (value: string) => {
    setInputValue(value);
    onChange?.(value);
  };

  const handleSelect = (option: AutocompleteOption) => {
    field.onChange(option);

    handleChangeInputValue(option.label);

    setIsOpen(false);
  };

  const handleChange = (value: string) => {
    if (!field.value) {
      handleChangeInputValue(value);
    }
  };

  const handleReset = () => {
    handleChangeInputValue("");
    field.onChange("");
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <AutocompleteView
            {...rest}
            name={field.name}
            value={inputValue}
            options={options}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSelect={handleSelect}
            onReset={handleReset}
            isOpen={isOpen}
          />
        );
      }}
    />
  );
};
