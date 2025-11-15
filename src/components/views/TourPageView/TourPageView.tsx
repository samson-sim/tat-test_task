"use client";

import { DateRangeView } from "../DateRangeView";
import { LocationView } from "../LocationView";
import { PriceView } from "../PriceView";
import { HotelServicesView } from "../HotelServicesView";

export const TourPageView = ({ price, hotel }: { price: any; hotel: any }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-4">
      <h1 className="text-2xl font-semibold">{hotel.name}</h1>

      <LocationView country={hotel.countryName} city={hotel.cityName} />

      <img
        src={hotel.img}
        alt={hotel.name}
        className="w-full h-56 object-cover rounded-xl"
      />

      <p className="mb-1 font-bold">Опис</p>
      <p className="text-gray-700 text-sm">{hotel.description}</p>

      <p className="font-bold mb-1">Сервіси</p>

      <HotelServicesView services={hotel.services} />
      <DateRangeView startDate={price.startDate} endDate={price.endDate} />
      <PriceView price={price.amount} currency={price.currency} />
    </div>
  );
};
