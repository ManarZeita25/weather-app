// src/App.tsx
import Header from "./components/Header";
import SearchCity from "./components/SearchCity";
import WeatherCard from "./components/WeatherCard";
import { useCitiesStore } from "./stores/useCitiesStore";

function App() {
  const cities = useCitiesStore((state) => state.cities);

  return (
    <div className="flex flex-col gap-4 px-4 py-8">
      <Header />
      <SearchCity />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map((city) => (
          <WeatherCard key={city.id} city={city} />
        ))}
      </div>
    </div>
  );
}

export default App;
