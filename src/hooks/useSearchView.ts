import { useSearch } from "@/context/SearchContext";

export const useSearchView = () => {
  const { joinedTours, status, error, isLoading } = useSearch();

  const tours = joinedTours.map((t) => ({
    id: t.priceId,
    hotelName: t.hotel.name,
    city: t.hotel.cityName,
    country: t.hotel.countryName,
    img: t.hotel.img,
    startDate: new Date(t.startDate),
    endDate: new Date(t.endDate),
    price: t.price,
    currency: t.currency.toUpperCase(),
    hotelId: t.hotel.id,
  }));

  return {
    tours,
    status,
    isLoading,
    error,
  };
};
