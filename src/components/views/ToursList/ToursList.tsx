"use client";

import { useSearchView } from "@/hooks/useSearchView";
import { Loader } from "../Loader";
import { ErrorView } from "../ErrorView";
import { TourCard } from "../TourCard";

export const ToursList = () => {
  const { tours, status, isLoading, error } = useSearchView();

  if (status === "idle") return null;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorView error={error} />;
  }

  if (!tours.length) {
    return (
      <div className="text-center text-gray-500">
        За вашим запитом турів не знайдено
      </div>
    );
  }

  return (
    <div className="w-[700px] mx-auto p-[25px] bg-white rounded-2xl shadow grid gap-5 md:grid-cols-2">
      {tours.map((tour) => (
        <TourCard key={tour.id} {...tour} />
      ))}
    </div>
  );
};
