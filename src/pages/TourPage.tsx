"use client";

import { useParams } from "next/navigation";
import { useTourDetails } from "../hooks/useTourDetails";
import { Loader, ErrorView, TourPageView } from "../components/views";

export const TourPage = () => {
  const { priceId, hotelId } = useParams<{
    priceId: string;
    hotelId: string;
  }>();

  console.log(priceId, hotelId);

  const { isLoading, error, data } = useTourDetails({
    priceId: priceId,
    hotelId: hotelId,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorView error={error} />;
  }

  return (
    <div className="w-[700px] mx-auto p-6">
      <TourPageView {...data} />
    </div>
  );
};
