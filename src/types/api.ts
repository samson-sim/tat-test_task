export type Country = {
  id: string;
  countryId: string;
  name: string;
  flag: string;
  type: "country";
};

export type City = {
  id: number;
  name: string;
  countryId?: string;
  type: "city";
};

export type Hotel = {
  id: number;
  name: string;
  img: string;
  cityId: number;
  cityName: string;
  countryId: string;
  countryName: string;
  description?: string;
  services?: {
    wifi?: string;
    aquapark?: string;
    tennis_court?: string;
    laundry?: string;
    parking?: string;
  };
  type: "hotel";
};

export type GeoEntity =
  | (Country & { type: "country" })
  | (City & { type: "city" })
  | (Hotel & { type: "hotel" });

export type CountriesMap = Record<string, Country>;
export type HotelsMap = Record<string, Hotel>;
export type GeoResponse = Record<string, GeoEntity>;
