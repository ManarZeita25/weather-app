import { useIsFetching } from "@tanstack/react-query";
import { REFRESH_MS } from "../types/constants";

function Header() {
  const isUpdating = useIsFetching({ queryKey: ["weather"] }) > 0;

  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="text-2xl bg-gray-50 rounded p-2">🌦️</div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Weather App</h1>
          <p className="text-sm text-gray-500">
            Real-time weather updates every {REFRESH_MS / 1000} seconds for your
            favorite cities!
          </p>
        </div>
      </div>

      <div className="text-lg bg-gray-50 rounded px-2 py-1" aria-live="polite">
        {isUpdating ? "🟡 Updating…" : "🔴 Live"}
      </div>
    </header>
  );
}

export default Header;
