"use client";

import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { startSearchPrices, getSearchPrices, getHotels } from "@/lib/api";
import {
  SearchContextValue,
  SearchStatus,
  SearchResultRaw,
  Price,
  Hotel,
  JoinedTour,
} from "./types";

const MAX_RETRIES = 2;

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const [currentCountryId, setCurrentCountryId] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<SearchResultRaw | null>(
    null
  );

  const [cache, setCache] = useState<Record<string, SearchResultRaw>>({});

  const [hotelsCache, setHotelsCache] = useState<
    Record<string, Record<string, Hotel>>
  >({});

  const isLoading = status === "loading" || status === "waiting";

  const prices = useMemo(
    () => (currentResult ? Object.values(currentResult.pricesById) : []),
    [currentResult]
  );

  const loadHotels = useCallback(
    async (countryId: string) => {
      if (hotelsCache[countryId]) return hotelsCache[countryId];

      const resp = await getHotels(countryId);
      const data = await resp.json();

      setHotelsCache((prev) => ({
        ...prev,
        [countryId]: data,
      }));

      return data;
    },
    [hotelsCache]
  );

  const joinedTours = useMemo<JoinedTour[]>(() => {
    if (!currentResult || !currentCountryId) return [];

    const hotels = hotelsCache[currentCountryId];
    if (!hotels) return [];

    return Object.values(currentResult.pricesById)
      .map((price) => {
        const hotel = Object.values(hotels).find(
          (hotel) => String(hotel.id) === String(price.hotelID)
        );
        if (!hotel) return null;

        return {
          priceId: price.id,
          hotel,
          startDate: price.startDate,
          endDate: price.endDate,
          price: price.amount,
          currency: price.currency,
        } as JoinedTour;
      })
      .filter(Boolean) as JoinedTour[];
  }, [currentResult, currentCountryId, hotelsCache]);

  const pollPrices = useCallback(
    async (
      token: string,
      countryId: string,
      waitUntil: string | null,
      retryAttempt: number
    ): Promise<void> => {
      if (waitUntil) {
        const waitMs = new Date(waitUntil).getTime() - Date.now();
        if (waitMs > 0) {
          setStatus("waiting");
          await new Promise((res) => setTimeout(res, waitMs));
        }
      }

      try {
        setStatus("loading");
        setError(null);

        const resp = await getSearchPrices(token);
        const data = (await resp.json()) as { prices: Record<string, Price> };

        const result: SearchResultRaw = {
          countryId,
          token,
          pricesById: data.prices ?? {},
        };

        setCurrentResult(result);
        setCache((prev) => ({
          ...prev,
          [countryId]: result,
        }));

        await loadHotels(countryId);

        setStatus("success");
      } catch (err: unknown) {
        if (err instanceof Response) {
          let body: any = null;
          try {
            body = await err.json();
          } catch {
            body = null;
          }

          if (err.status === 425 && body?.waitUntil) {
            return pollPrices(token, countryId, body.waitUntil, retryAttempt);
          }

          if (retryAttempt < MAX_RETRIES) {
            return pollPrices(token, countryId, null, retryAttempt + 1);
          }

          setStatus("error");
          setError(
            body?.message || "Сталася помилка при отриманні результатів."
          );
          return;
        }

        if (retryAttempt < MAX_RETRIES) {
          return pollPrices(token, countryId, null, retryAttempt + 1);
        }

        setStatus("error");
        setError("Невідома помилка при отриманні результатів.");
      }
    },
    [loadHotels]
  );

  const startSearch = useCallback(
    async (countryId: string) => {
      if (!countryId) {
        setError("Будь ласка, оберіть країну.");
        setStatus("error");
        return;
      }

      setCurrentCountryId(countryId);

      if (cache[countryId]) {
        setCurrentResult(cache[countryId]);
        await loadHotels(countryId);
        setStatus("success");
        setError(null);
        return;
      }

      try {
        setStatus("loading");
        setError(null);

        const resp = await startSearchPrices(countryId);
        const { token, waitUntil } = (await resp.json()) as {
          token: string;
          waitUntil: string;
        };

        await pollPrices(token, countryId, waitUntil, 0);
      } catch (err: unknown) {
        setError("Не вдалося розпочати пошук турів.");
        setStatus("error");
      }
    },
    [cache, pollPrices, loadHotels]
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
    setCurrentResult(null);
    setCurrentCountryId(null);
  }, []);

  const value: SearchContextValue = {
    status,
    error,
    isLoading,
    currentCountryId,
    result: currentResult,
    prices,
    joinedTours,
    startSearch,
    reset,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch: () => SearchContextValue = () => {
  const ctx = useContext(SearchContext);

  if (!ctx) {
    throw new Error("useSearch must be used within <SearchProvider>");
  }
  return ctx;
};
