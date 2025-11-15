"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { startSearchPrices, getSearchPrices } from "@/lib/api";
import {
  SearchContextValue,
  SearchStatus,
  SearchResultRaw,
  Price,
} from "./types";

const MAX_RETRIES = 2;

export const SearchContext = createContext<SearchContextValue | undefined>(
  undefined
);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [currentCountryId, setCurrentCountryId] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<SearchResultRaw | null>(
    null
  );

  const [cache, setCache] = useState<Record<string, SearchResultRaw>>({});

  const isLoading = status === "loading" || status === "waiting";

  const prices = useMemo(
    () => (currentResult ? Object.values(currentResult.pricesById) : []),
    [currentResult]
  );

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
    []
  );

  const startSearch = useCallback(
    async (countryId: string): Promise<void> => {
      if (!countryId) {
        setError("Будь ласка, оберіть країну.");
        setStatus("error");
        return;
      }

      setCurrentCountryId(countryId);

      if (cache[countryId]) {
        setCurrentResult(cache[countryId]);
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
    [cache, pollPrices]
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
    startSearch,
    reset,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextValue => {
  const ctx = useContext(SearchContext);

  if (!ctx) {
    throw new Error("useSearch must be used within SearchProvider");
  }

  return ctx;
};
