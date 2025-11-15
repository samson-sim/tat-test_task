export type SearchStatus = "idle" | "loading" | "waiting" | "success" | "error";

export interface Price {
  id: string;
  amount: number;
  currency: string;
  startDate: string;
  endDate: string;
  hotelID: string;
}

export interface SearchResultRaw {
  countryId: string;
  token: string;
  pricesById: Record<string, Price>;
}

export interface SearchContextValue {
  status: SearchStatus;
  error: string | null;
  isLoading: boolean;
  currentCountryId: string | null;
  result: SearchResultRaw | null;
  prices: Price[];
  startSearch: (countryId: string) => Promise<void>;
  reset: () => void;
}
