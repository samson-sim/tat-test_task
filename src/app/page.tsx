"use client";

import { SearchForm, SearchStatus } from "../components/form";
import { SearchProvider } from "../context";

export default function HomePage() {
  return (
    <SearchProvider>
      <div className="w-full px-4 flex flex-col items-center gap-6">
        <SearchForm />
        <SearchStatus />
      </div>
    </SearchProvider>
  );
}
