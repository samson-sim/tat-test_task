import { useEffect, useState } from "react";
import { getPrice, getHotel } from "@/lib/api";

interface UseTourDetailsProps {
  priceId: string;
  hotelId: string;
}

export const useTourDetails = ({ priceId, hotelId }: UseTourDetailsProps) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!priceId || !hotelId) return;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const [priceResp, hotelResp] = await Promise.all([
          getPrice(priceId),
          getHotel(Number(hotelId)),
        ]);

        const [price, hotel] = await Promise.all([
          priceResp.json(),
          hotelResp.json(),
        ]);

        setData({
          priceId,
          hotel,
          price,
        });
      } catch (e) {
        setError("Не вдалося завантажити дані туру.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [priceId, hotelId]);

  return { isLoading, error, data };
};
