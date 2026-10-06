import { Wind } from "lucide-react";
import type { CityData } from "../types/CityData";
import { getWeatherCodeDescription } from "../utils/getWeatherCodeDescription";
import { useWeather } from "../hooks/useWeather";
import { useCitiesStore } from "../stores/useCitiesStore";

type WeatherCardProps = {
  city: CityData;
};

function WeatherCard({ city }: WeatherCardProps) {
  const removeCity = useCitiesStore((state) => state.removeCity);
  const { data: weather, isPending, isError, refetch } = useWeather(city);

  const info = weather
    ? getWeatherCodeDescription(weather.current.weather_code)
    : null;

  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl p-5 bg-white shadow-md border border-gray-300">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h2 className="text-base font-semibold text-gray-800">
          📍 {city.name}, {city.country}
        </h2>

        <button
          type="button"
          onClick={() => removeCity(city.id)}
          aria-label={`Remove ${city.name}`}
          title="Delete city"
          className="flex items-center justify-center w-8 h-8 rounded-full
             text-gray-400 hover:text-white hover:bg-red-500
             hover:scale-110 transition-all duration-200"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      {isPending && (
        <p className="text-center text-gray-400 mt-6 text-sm">
          Loading weather...
        </p>
      )}

      {isError && !weather && (
        <div className="text-center mt-6">
          <p className="text-sm text-red-600">Couldn't load weather.</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-2 text-sm underline text-gray-600 hover:text-gray-900"
          >
            Try again
          </button>
        </div>
      )}

      {weather && info && (
        <div className="mt-6 flex flex-col items-start">
          <div className="text-4xl" aria-hidden="true">
            {info.icon}
          </div>

          <p className="text-5xl font-bold text-gray-800 mt-2">
            {Math.round(weather.current.temperature_2m)}
            {weather.current_units.temperature_2m}
          </p>

          <p className="text-xl text-gray-500 mt-1">{info.label}</p>

          <div className="flex items-center gap-2 mt-6">
            <Wind className="w-5 h-5 text-gray-500" />
            <span className="text-xl font-medium text-gray-700">
              {weather.current.wind_speed_10m}
            </span>
            <span className="text-sm text-gray-500">
              {weather.current_units.wind_speed_10m}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
