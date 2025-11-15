import { FC } from "react";

interface LocationViewProps {
  country: string;
  city: string;
}

export const LocationView: FC<LocationViewProps> = ({ country, city }) => {
  return (
    <div className="text-gray-500 text-sm">
      {country}, {city}
    </div>
  );
};
