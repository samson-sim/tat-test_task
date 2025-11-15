import { FC } from "react";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { HiOutlineCalendarDays } from "react-icons/hi2";

interface DateRangeViewProps {
  startDate: Date;
  endDate: Date;
}

export const DateRangeView: FC<DateRangeViewProps> = ({
  startDate,
  endDate,
}) => {
  return (
    <div className="text-gray-700 text-sm flex items-center gap-2">
      <HiOutlineCalendarDays className="w-4 h-4 text-gray-500" />
      <span>
        {format(startDate, "dd.MM.yyyy", { locale: uk })} —{" "}
        {format(endDate, "dd.MM.yyyy", { locale: uk })}
      </span>
    </div>
  );
};
