import { FC } from "react";
import { HiOutlineMapPin } from "react-icons/hi2";

interface LocationViewProps {
  country: string;
  city: string;
}

export const LocationView: FC<LocationViewProps> = ({ country, city }) => {
  return (
    <div className="text-gray-700 text-sm flex items-center gap-2">
      <HiOutlineMapPin className="w-4 h-4 text-gray-500" />
      <span className="text-gray-500">
        {country}, {city}
      </span>
    </div>
  );
};
