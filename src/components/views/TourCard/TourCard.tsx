import { FC } from "react";
import Link from "next/link";
import { DateRangeView } from "../DateRangeView";
import { LocationView } from "../LocationView";
import { PriceView } from "../PriceView";

interface TourCardProps {
  id: number | string;
  img: string;
  hotelName: string;
  country: string;
  city: string;
  startDate: Date;
  endDate: Date;
  price: number;
  currency: string;
  hotelId: number;
}

export const TourCard: FC<TourCardProps> = ({
  id,
  img,
  hotelName,
  country,
  city,
  startDate,
  endDate,
  price,
  currency,
  hotelId,
}) => {
  return (
    <div
      key={id}
      className="border rounded-xl overflow-hidden shadow-sm bg-white"
    >
      <img src={img} className="w-full h-40 object-cover" alt={hotelName} />

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg">{hotelName}</h3>

        <LocationView country={country} city={city} />
        <DateRangeView startDate={startDate} endDate={endDate} />
        <PriceView price={price} currency={currency} />

        <Link
          href={`/tour/${id}/${hotelId}`}
          className="block text-center mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
          aria-label={`Відкрити подробиці туру для ${hotelName}`}
        >
          Відкрити ціну
        </Link>
      </div>
    </div>
  );
};
