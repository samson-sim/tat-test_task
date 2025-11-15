"use client";

import { useParams } from "next/navigation";
import { useTourDetails } from "../hooks/useTourDetails";
import { Loader, ErrorView, TourPageView } from "../components/views";

const TourPage = () => {
  const { priceId, hotelId } = useParams<{
    priceId: string;
    hotelId: string;
  }>() ?? { priceId: "", hotelId: "" };

  const { isLoading, error, data } = useTourDetails({
    priceId: priceId,
    hotelId: hotelId,
  });

  return (
    <main className="w-full px-4 py-10 flex justify-center min-h-[60vh]">
      {isLoading && <Loader />}

      {!isLoading && error && (
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow p-6">
          <ErrorView error={error} />
        </div>
      )}

      {!isLoading && !error && data && (
        <div className="w-full max-w-3xl">
          <TourPageView {...data} />
        </div>
      )}
    </main>
  );
};

export default TourPage;
