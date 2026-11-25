
const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export type WeatherResult = {
  name: string;
  country: string;
  lat: number;
  lon: number;
  temperature: number;
  description: string;
  icon: string;
};

export async function searchWeather(city: string): Promise<WeatherResult[]> {
  if (!API_KEY) {
    throw new Error("Weather API key is missing.");
  }

  const cityUrl =
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=5&appid=${API_KEY}`;

  const cityResponse = await fetch(cityUrl);

  if (!cityResponse.ok) {
    throw new Error("Failed to search cities.");
  }

  const cities = await cityResponse.json();

  const results = await Promise.all(
    cities.map(async (location: any) => {
      const weatherUrl =
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`;

      const weatherResponse = await fetch(weatherUrl);

      if (!weatherResponse.ok) {
        throw new Error("Failed to fetch weather.");
      }

      const weather = await weatherResponse.json();

      return {
        name: location.name,
        country: location.country,
        lat: location.lat,
        lon: location.lon,
        temperature: weather.main.temp,
        description: weather.weather[0].description,
        icon: weather.weather[0].icon,
      };
    })
  );

  return results;
}
