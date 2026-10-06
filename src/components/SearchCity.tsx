// src/components/SearchCity.tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { CityData } from "../types/CityData";
import { searchCities } from "../services/geocodingApi";
import { useDebounce } from "../hooks/useDebounce";
import { useCitiesStore } from "../stores/useCitiesStore";

const MIN_CHARS = 3;

function SearchCity() {
  const addCity = useCitiesStore((state) => state.addCity);
  const [query, setQuery] = useState("");

  const trimmedQuery = query.trim();
  const debouncedQuery = useDebounce(trimmedQuery, 400);
  const canSearch = debouncedQuery.length >= MIN_CHARS;

  const {
    data: results = [],
    isFetching,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["cities", debouncedQuery],
    queryFn: ({ signal }) => searchCities(debouncedQuery, signal),
    enabled: canSearch,
    staleTime: 5 * 60_000,
  });

  const showResults = trimmedQuery.length >= MIN_CHARS;
  const isWaitingForDebounce = trimmedQuery !== debouncedQuery;
  const showEmpty =
    isSuccess && !isFetching && !isWaitingForDebounce && results.length === 0;

  const handleSelect = (city: CityData) => {
    addCity(city);
    setQuery("");
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a city..."
        aria-label="Search for a city"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
      />

      {showResults && (
        <div className="border border-gray-300 rounded-md mt-2 p-2 max-h-60 overflow-y-auto">
          {(isFetching || isWaitingForDebounce) && (
            <p className="text-gray-500">Searching...</p>
          )}

          {isError && (
            <p className="text-red-600">
              Something went wrong. Please try again.
            </p>
          )}

          {showEmpty && <p className="text-gray-500">No cities found.</p>}

          {!isError && results.length > 0 && (
            <ul className="flex flex-col gap-2">
              {results.map((result) => (
                <li key={result.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(result)}
                    className="w-full text-left cursor-pointer border border-gray-300 hover:bg-gray-100 p-2 rounded-md"
                  >
                    {result.name}, {result.country}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchCity;
