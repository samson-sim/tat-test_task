"use client";

import { SearchForm } from "../components/form";
import { SearchProvider } from "../context";
import { ToursList } from "../components/views";

const SearchPage = () => {
  return (
    <SearchProvider>
      <div className="w-full px-4 py-10 flex flex-col items-center gap-6">
        <SearchForm />
        <ToursList />
      </div>
    </SearchProvider>
  );
};

export default SearchPage;
