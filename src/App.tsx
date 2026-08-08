import { useEffect, useState } from 'react'
import { WeatherCard } from './components/WeatherCard/WeatherCard'
import { HourlyCard } from './components/HourlyCard/HourlyCard'
import { WeeklyCard } from './components/WeeklyCard/WeeklyCard'
import { Navbar } from './components/Navbar/Navbar'
import './App.css'
import Settings from './components/Pages/Settings'

const getWeatherData = async (city: string) => {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${import.meta.env.VITE_API_KEY}&contentType=json`
  )

  if (!response.ok) {
    throw new Error('Unable to fetch weather data')
  }

  return response.json()
}

function App() {
  const [city, setCity] = useState("Tsomo")
  const [weatherData, setWeatherData] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      setError("")
      try {
        const data = await getWeatherData(city)

        const today = data.days[0]

        setWeatherData({
          current: {
            temp: today.temp,
            tempmax: today.tempmax,
            tempmin: today.tempmin,
            conditions: today.conditions,
            icon: today.icon,
            windspeed: today.windspeed, 
            humidity: today.humidity,
          },
          hourly: today.hours,
          weekly: data.days,
          location: data.resolvedAddress,
        })
      } catch (e) {
        setError(`Error: ${e instanceof Error ? e.message : String(e)}`)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [city])

  return (
    <div className="App">
      <div className="container">
        <Navbar onSearch={setCity} location={weatherData?.location} 
        onSettings={() => setShowSettings(true)}
/>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {showSettings ? (
  <Settings onClose={() => setShowSettings(false)} />
) : (
  weatherData && (
    <>
      <WeatherCard data={weatherData.current} />

      <HourlyCard data={weatherData.hourly} />

      <WeeklyCard
        data={weatherData.weekly}
        currentWindspeed={weatherData.current.windspeed}
        currentHumidity={weatherData.current.humidity}
      />
    </>
  )
)}
      </div>
    </div>
  )
}

export default App
