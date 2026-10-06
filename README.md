🌦️ Weather App

A real-time weather dashboard. Search for any city, add it to your list, and watch its current weather update automatically every 15 seconds. Your cities are saved between visits.

## 🚀 Live Demo

🌍 Live Website: [https://weather-app-mu-ruddy-93.vercel.app/](https://weather-app-nine-beige-16.vercel.app/)

---

## ✨ Features

- 🔍 **City search** with debounce (400 ms) and a 3-character minimum, so it doesn't spam the API
- 🌡️ **Live weather cards** showing temperature, condition, and wind speed
- 🔄 **Auto-refresh every 15 seconds** (pauses when the tab is in the background)
- 💾 **Persistent city list** that survives page reloads
- 🚫 **No duplicate cities**
- ⚠️ **Loading and error states** with a "Try again" button
- 📱 **Responsive layout**: 1 column on mobile, 2 on tablet, 3 on desktop
- ♿ **Accessible**: proper heading hierarchy, `aria-label`s, and live status updates
---

## 🛠️ Tech Stack

| Category | Tools |
|---|---|
| Framework | React + TypeScript |
| Styling | Tailwind CSS |
| Server state | TanStack Query |
| Client state | Zustand (with `persist` middleware) |
| Icons | lucide-react |
| API | [Open-Meteo](https://open-meteo.com/) (Geocoding + Forecast), free, no API key |

---

## 🧠 What I Learned

- Replacing manual `useEffect` + `fetch` logic with **TanStack Query** for caching, polling, loading and error states, and automatic request cancellation
- Managing global state with **Zustand** and persisting it with the `persist` middleware
- Debouncing user input and cancelling stale requests with `AbortController`
- Typing API responses and handling edge cases (like Open-Meteo omitting `results` when nothing matches)
- Building accessible, responsive UIs with Tailwind CSS

## 🔌 API Reference

**Geocoding:** `https://geocoding-api.open-meteo.com/v1/search?name={city}&count=5`

**Forecast:** `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,weather_code,wind_speed_10m`

## 🔮 Future Improvements

- Hourly and 7-day forecast
- Celsius / Fahrenheit toggle
- Dark mode
- Unit and component tests (Vitest + React Testing Library)

