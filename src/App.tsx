import { useEffect, useState } from 'react'
import { SearchBar } from './components/SearchBar/SearchBar'
import { WeatherCard } from './components/WeatherCard/WeatherCard'
import { HourlyCard } from './components/HourlyCard/HourlyCard'
import { WeeklyCard } from './components/WeeklyCard/WeeklyCard' 
import { format } from 'date-fns'  

import './App.css'

const getWeatherData = async (city: string) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=API_KEY&q=${encodeURIComponent(
      city,
    )}&days=7&aqi=no&alerts=no`,
  );

  if (!response.ok) {
    throw new Error('Unable to fetch weather data');
  }

  return response.json();
};

function App() {
  const [city, setCity] = useState("london");
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getWeatherData(city);
        const { mintemp_c, maxtemp_c } = data.current;

        setWeatherData({
          current: {...data.current, mintemp_c, maxtemp_c},
          hourly: data.forecast.forecastday[0].hour,
          weekly: data.forecast.forecastday.slice(1),
          location: data.location,
        });
      } catch(e) {
        setError(`Error: ${e instanceof Error ? e.message : String(e)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);
  return (
    <div className={'App'}>
      <div className="container">
        <SearchBar onSearch={setCity} />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherData && (
          <>
            {/* <WeatherCard data={weatherData.current} location={weatherData.location} /> */}
            <HourlyCard data={weatherData.hourly} />
            <WeeklyCard data={weatherData.weekly} />
          </>
        )}
      </div>
    </div>
  );
}

export default App
