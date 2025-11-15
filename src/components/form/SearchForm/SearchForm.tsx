"use client";

import { FC } from "react";
import { Form } from "../BaseForm";
import { SearchInput } from "../../inputs";
import { useSearch } from "../../../context";

export const SearchForm: FC = () => {
  const { startSearch } = useSearch();

  const handleSubmit = async (countryId: string) => {
    await startSearch(countryId);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-center text-lg font-semibold mb-4">
        Форма пошуку турів
      </h2>

      <Form
        defaultValues={{
          search: {
            id: "",
            countryId: "",
          },
        }}
        onSubmit={(values) => {
          handleSubmit(values.search.countryId || values.search.id);
        }}
      >
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <SearchInput />
          </div>

          <button
            type="submit"
            className="px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition cursor-pointer"
          >
            Знайти
          </button>
        </div>
      </Form>
    </div>
  );
};
