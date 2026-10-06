type CurrentWeatherUnits = {
  time: string;
  interval: string;
  temperature_2m: string;
  weather_code: string;
  wind_speed_10m: string;
};

type CurrentWeather = {
  time: string;
  interval: number;
  temperature_2m: number;
  weather_code: number;
  wind_speed_10m: number;
};

export type WeatherDataAPIResponse = {
  latitude: number;
  longitude: number;
  timezone: string;
  current_units: CurrentWeatherUnits;
  current: CurrentWeather;
};
