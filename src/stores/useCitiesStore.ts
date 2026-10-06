import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CityData } from "../types/CityData";

type CitiesState = {
  cities: CityData[];
  addCity: (city: CityData) => void;
  removeCity: (cityId: number) => void;
};

export const useCitiesStore = create<CitiesState>()(
  persist(
    (set) => ({
      cities: [],
      addCity: (city) =>
        set((state) =>
          state.cities.some((c) => c.id === city.id)
            ? state
            : { cities: [...state.cities, city] },
        ),
      removeCity: (cityId) =>
        set((state) => ({
          cities: state.cities.filter((c) => c.id !== cityId),
        })),
    }),
    { name: "weather-cities" },
  ),
);
