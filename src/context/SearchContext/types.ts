export type SearchStatus = "idle" | "loading" | "waiting" | "success" | "error";

export interface Hotel {
  id: number;
  name: string;
  img: string;
  cityId: number;
  cityName: string;
  countryId: string;
  countryName: string;
}

export interface JoinedTour {
  priceId: string;
  hotel: Hotel;
  startDate: string;
  endDate: string;
  price: number;
  currency: string;
}

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
  joinedTours: JoinedTour[];
}
