"use client";
import { ReactNode } from "react";
import { FC } from "react";
import {
  HiWifi,
  HiSparkles,
  HiHome,
  HiShieldCheck,
  HiOutlineBuildingStorefront,
} from "react-icons/hi2";

const mapping: Record<string, ReactNode> = {
  wifi: <HiWifi className="w-5 h-5" />,
  aquapark: <HiSparkles className="w-5 h-5" />,
  tennis_court: <HiHome className="w-5 h-5" />,
  laundry: <HiShieldCheck className="w-5 h-5" />,
  parking: <HiOutlineBuildingStorefront className="w-5 h-5" />,
};

interface HotelServicesViewProps {
  services: Record<string, string>;
}

export const HotelServicesView: FC<HotelServicesViewProps> = ({ services }) => {
  return (
    <div className="flex items-center flex-wrap gap-4 text-sm text-gray-700">
      {Object.entries(services).map(([key, val]) => {
        const isAvailable = val === "yes";

        return (
          <div
            key={key}
            className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg"
          >
            {mapping[key] || <HiHome className="w-5 h-5" />}
            <span className={!isAvailable ? "line-through text-gray-400" : ""}>
              {key === "wifi"
                ? "Wi-Fi"
                : key === "aquapark"
                ? "Басейн"
                : key === "tennis_court"
                ? "Теніс"
                : key === "laundry"
                ? "Прання"
                : key === "parking"
                ? "Паркінг"
                : key}
            </span>
          </div>
        );
      })}
    </div>
  );
};
