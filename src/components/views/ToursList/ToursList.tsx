"use client";

import { useSearchView } from "@/hooks/useSearchView";
import { Loader } from "../Loader";
import { ErrorView } from "../ErrorView";
import { TourCard } from "../TourCard";

export const ToursList = () => {
  const { tours, status, isLoading, error } = useSearchView();

  if (status === "idle") return null;

  const hasResults = Boolean(tours.length);

  return (
    <section
      aria-label="Результати пошуку турів"
      aria-busy={isLoading}
      className="w-full max-w-5xl"
    >
      {isLoading && (
        <div className="bg-white rounded-2xl shadow p-6">
          <Loader />
        </div>
      )}

      {!isLoading && error && (
        <div className="bg-white rounded-2xl shadow p-6">
          <ErrorView error={error} />
        </div>
      )}

      {!isLoading && !error && !hasResults && (
        <p className="text-center text-gray-600 bg-white rounded-2xl shadow p-8">
          За вашим запитом турів не знайдено. Спробуйте змінити напрямок або
          дати подорожі.
        </p>
      )}

      {!isLoading && !error && hasResults && (
        <ul className="grid gap-5 md:grid-cols-2">
          {tours.map((tour) => (
            <li key={tour.id} className="list-none">
              <TourCard {...tour} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
