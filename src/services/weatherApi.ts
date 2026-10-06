import type { CityData } from "../types/CityData";
import type { WeatherDataAPIResponse } from "../types/WeatherData";

export async function fetchWeather(
  city: Pick<CityData, "latitude" | "longitude">,
  signal?: AbortSignal,
): Promise<WeatherDataAPIResponse> {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current: "temperature_2m,weather_code,wind_speed_10m",
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}
