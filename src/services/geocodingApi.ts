import type { CityData, CityDataAPIResponse } from "../types/CityData";

export async function searchCities(
  name: string,
  signal?: AbortSignal,
): Promise<CityData[]> {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=5`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data: CityDataAPIResponse = await response.json();
  return data.results ?? [];
}
