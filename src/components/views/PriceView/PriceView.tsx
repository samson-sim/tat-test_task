import { FC } from "react";

interface PriceViewProps {
  price: number;
  currency: string;
}

export const PriceView: FC<PriceViewProps> = ({ price, currency }) => {
  return (
    <div className="text-blue-600 font-bold text-xl">
      {price.toLocaleString("uk-UA")} {currency.toUpperCase()}
    </div>
  );
};
