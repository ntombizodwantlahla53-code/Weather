import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import WeatherCard from './components/WeatherCard/WeatherCard'
import HourlyCard from './components/HourlyCard/HourlyCard'
import WeeklyCard from './components/WeeklyCard/WeeklyCard'
import Settings from './components/Pages/Settings'
import './App.css'

function App() {
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentLocation, setCurrentLocation] = useState('Loading...')
  const [temperature, setTemperature] = useState<'C' | 'F'>(
    localStorage.getItem('temperature') === 'F' ? 'F' : 'C'
  )
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  )
  const [notifications, setNotifications] = useState(
    localStorage.getItem('notifications') !== 'false'
  )
  const [savedLocations, setSavedLocations] = useState<string[]>(
    JSON.parse(localStorage.getItem('savedLocations') || '[]')
  )

  const getWeather = async (
    location: string,
    isCurrentLocation = false
  ) => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${import.meta.env.VITE_API_KEY}&contentType=json`
      )
      if (!response.ok) {
        throw new Error('Location is not found, try again')
      }
      const data = await response.json()
      setWeather(data)

      if (!isCurrentLocation) {
        setCurrentLocation(data.resolvedAddress)
      }
    } catch {
      setError('Unable to get weather')
    }
    setLoading(false)
  }

  const saveLocation = (city: string) => {
    if (!savedLocations.includes(city)) {
      const newLocations = [...savedLocations, city]
      setSavedLocations(newLocations)

      localStorage.setItem(
        'savedLocations',
        JSON.stringify(newLocations)
      )
    }
  }
  const clearLocations = () => {
    setSavedLocations([])
    localStorage.removeItem('savedLocations')
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        getWeather(
          `${latitude},${longitude}`,
          true
        )
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
          const data = await response.json()
          const village =
            data.address.village ||
            data.address.hamlet ||
            data.address.suburb ||
            data.address.neighbourhood ||
            data.address.quarter ||
            ''
          const city =
            data.address.city ||
            data.address.town ||
            ''
          const locationName = [village, city]
            .filter(Boolean)
            .filter(
              (value, index, array) =>
                array.indexOf(value) === index
            )
            .join(', ')
          setCurrentLocation(
            locationName || 'Current Location'
          )
        } catch {
          setCurrentLocation('Current Location')
        }
      },
      () => {
        setError('Please allow location /or search for a city')
        setLoading(false)
      }
    )
  }, [])
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode)
  }, [darkMode])
  const changeTemperature = (unit: 'C' | 'F') => {
    setTemperature(unit)
    localStorage.setItem('temperature', unit)
  }
  const changeTheme = (value: boolean) => {
    setDarkMode(value)
    localStorage.setItem('darkMode', String(value))
  }
  const changeNotifications = () => {
    const value = !notifications
    setNotifications(value)
    localStorage.setItem('notifications', String(value))
  }
  return (
    <div className="App">
      <div className="container">
        <Navbar
          location={currentLocation}
          onSearch={(city) => {
            getWeather(city)
            saveLocation(city)
          }}
        />
        <Routes>
          <Route path="/" element={
              <>
                {loading && <p>Loading weather...</p>}
                {error && <p>{error}</p>}
                {weather && (
                  <>
                    <WeatherCard data={weather.days[0]}
                      current={weather.currentConditions}
                      temperature={temperature}/>
                    <HourlyCard data={weather.days[0].hours}
                      temperature={temperature}/>
                    <WeeklyCard data={weather.days}
                      temperature={temperature}
                      wind={weather.currentConditions?.windspeed}
                      windDir={weather.currentConditions?.winddir}
                      humidity={weather.currentConditions?.humidity}
                      uv={weather.currentConditions?.uvindex}
                      pressure={weather.currentConditions?.pressure}/>
                  </>
                )}</>
            }/>
          <Route path="/settings" element={
               <Settings
                temperature={temperature}
                darkMode={darkMode}
                notifications={notifications}
                savedLocations={savedLocations}
                onTemperatureChange={changeTemperature}
                onThemeChange={changeTheme}
                onNotificationsChange={changeNotifications}
                onClearLocations={clearLocations}/>}
                />
        </Routes>
      </div>
    </div>
  )
}
export default App