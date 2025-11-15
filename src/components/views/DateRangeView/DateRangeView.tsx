import { FC } from "react";
import { format } from "date-fns";
import { uk } from "date-fns/locale";

interface DateRangeViewProps {
  startDate: Date;
  endDate: Date;
}

export const DateRangeView: FC<DateRangeViewProps> = ({
  startDate,
  endDate,
}) => {
  return (
    <div className="text-gray-700 text-sm">
      {format(startDate, "dd.MM.yyyy", { locale: uk })} —{" "}
      {format(endDate, "dd.MM.yyyy", { locale: uk })}
    </div>
  );
};
