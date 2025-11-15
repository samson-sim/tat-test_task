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

const icons: Record<string, ReactNode> = {
  wifi: <HiWifi className="w-5 h-5" />,
  aquapark: <HiSparkles className="w-5 h-5" />,
  tennis_court: <HiHome className="w-5 h-5" />,
  laundry: <HiShieldCheck className="w-5 h-5" />,
  parking: <HiOutlineBuildingStorefront className="w-5 h-5" />,
};

const labels: Record<string, string> = {
  wifi: "Wi-Fi",
  aquapark: "Басейн",
  tennis_court: "Тенісний корт",
  laundry: "Пральня",
  parking: "Паркінг",
};

interface HotelServicesViewProps {
  services: Record<string, string>;
}

export const HotelServicesView: FC<HotelServicesViewProps> = ({ services }) => {
  return (
    <ul
      className="flex items-center flex-wrap gap-4 text-sm text-gray-700"
      aria-label="Сервіси готелю"
    >
      {Object.entries(services).map(([key, val]) => {
        const isAvailable = val === "yes";
        const label = labels[key] || key;
        const icon = icons[key] || <HiHome className="w-5 h-5" />;

        return (
          <li
            key={key}
            className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg"
            aria-label={`${label} ${isAvailable ? "доступний" : "недоступний"}`}
          >
            <span className="text-gray-600" aria-hidden="true">
              {icon}
            </span>
            <span className={!isAvailable ? "line-through text-gray-400" : ""}>
              {label}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
