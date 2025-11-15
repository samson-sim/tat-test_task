"use client";

import { SearchForm } from "../components/form";
import { SearchProvider } from "../context";
import { ToursList } from "../components/views";

export default function HomePage() {
  return (
    <SearchProvider>
      <div className="w-full px-4 flex flex-col items-center gap-6">
        <SearchForm />
        <ToursList />
      </div>
    </SearchProvider>
  );
}
