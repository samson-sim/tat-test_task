"use client";
import { useEffect, useMemo, useState } from "react";
import { Autocomplete } from "../Autocomplete";
import { getCountries, searchGeo } from "@/lib/api";
import { City, CountriesMap, GeoEntity, Hotel } from "@/types/api";
import {
  HiOutlineBuildingOffice2,
  HiOutlineGlobeAlt,
  HiOutlineHome,
} from "react-icons/hi2";
import { useFormContext, useWatch } from "react-hook-form";

const getIcon = ({
  type,
  flag,
  name,
}: {
  type: GeoEntity["type"];
  flag?: string;
  name: string;
}) => {
  switch (type) {
    case "country":
      return flag ? (
        <img src={flag} alt={name} className="w-6 h-4 object-cover" />
      ) : (
        <HiOutlineGlobeAlt className="w-6 h-4" />
      );

    case "city":
      return <HiOutlineBuildingOffice2 className="w-6 h-4" />;

    case "hotel":
      return <HiOutlineHome className="w-6 h-4" />;
  }
};

export const SearchInput = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState<GeoEntity[]>([]);
  const [searchOptions, setSearchOptions] = useState<GeoEntity[]>([]);
  const [inputValue, setInputValue] = useState("");
  const search = useWatch({ name: "search" });

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const loadCountries = async () => {
    setIsLoading(true);

    try {
      const countries = await getCountries();
      const countriesData: CountriesMap = await countries.json();

      setCountries(
        Object.values(countriesData).map((country) => ({
          ...country,
          type: "country" as const,
        }))
      );
    } catch (error) {
      console.error("Failed to load countries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSearchOptions = async () => {
    setIsLoading(true);

    try {
      const searchOptions = await searchGeo(inputValue);
      const searchData = await searchOptions.json();
      setSearchOptions(Object.values(searchData));
    } catch (error) {
      console.error("Failed to load search options:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCountries();
  }, []);

  useEffect(() => {
    if (inputValue) {
      loadSearchOptions();
    } else {
      setSearchOptions([]);
    }
  }, [inputValue]);

  const finalSearchOptions = useMemo(() => {
    const isCountrySelected = search?.type === "country";

    if (isCountrySelected || !inputValue) {
      return countries;
    }

    return searchOptions;
  }, [searchOptions, countries, search]);

  return (
    <Autocomplete
      name="search"
      placeholder="Оберіть напрямок подорожі"
      renderOption={({ id, label }) => {
        const option = finalSearchOptions.find((option) => option.id === id);

        if (!option) return null;

        return (
          <div className="flex items-center gap-3">
            {getIcon({
              type: option.type,
              flag: "flag" in option ? option.flag : undefined,
              name: option.name,
            })}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 truncate">{label}</div>
            </div>
          </div>
        );
      }}
      options={finalSearchOptions.map((option) => ({
        id: option.id,
        label: option.name,
        countryId: option.countryId,
        type: option.type,
      }))}
      onChange={handleChange}
      isLoading={isLoading}
    />
  );
};
