import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../services/weatherApi";
import { REFRESH_MS } from "../types/constants";
import type { CityData } from "../types/CityData";

export function useWeather(city: CityData) {
  return useQuery({
    queryKey: ["weather", city.latitude, city.longitude],
    queryFn: ({ signal }) => fetchWeather(city, signal),
    refetchInterval: REFRESH_MS,
  });
}
