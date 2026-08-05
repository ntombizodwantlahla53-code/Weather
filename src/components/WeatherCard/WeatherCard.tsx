import React from 'react'
import { format } from 'date-fns'
import styles from './WeatherCard.module.css'
import clearDay from '../../assets/icons/clear-day.png'
import clearNight from '../../assets/icons/clear-night.png'
import cloudy from '../../assets/icons/cloudy.png'
import rainy from '../../assets/icons/rainy.png'
import thunderstorm from '../../assets/icons/thunderstorm.png'
import lightning from '../../assets/icons/lightning.png'
import wind from '../../assets/icons/wind.png'
import partlycloudyday from '../../assets/icons/partly-cloudy-day.png'

const iconMap: Record<string, string> = {
  'clear-day': clearDay,
  'clear-night': clearNight,
  'cloudy': cloudy,
  'rainy': rainy,
  'thunderstorm': thunderstorm,
  'lightning': lightning,
  'wind': wind,
  'partly-cloudy-day': partlycloudyday,
}
interface WeatherCardProps {
  data: {
    temp: number
    tempmax: number
    tempmin: number
    conditions: string
    icon: string
    feelslike?: number
    windspeed?: number
    humidity?: number
  }
  location: string
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data, location }) => {
  const {
    temp,
    tempmax,
    tempmin,
    conditions,
    icon,
    feelslike,
    windspeed,
    humidity,
  } = data

  return (
    <div className="current-weather">
      <div className="card left-card">
        <div>
          <h2>{location}</h2>
          <h1 className="temp">{Math.round(temp)}°</h1>
          <p>
            ↑{Math.round(tempmax)}° / ↓{Math.round(tempmin)}°
          </p>
          {feelslike && <p>Feels like {Math.round(feelslike)}°</p>}
          <p>{format(new Date(), 'EEEE, h:mm a')}</p>
        </div>
        <div className="condition">
          <img
            src={iconMap[icon]} 
            alt={conditions} className={styles['condition-icon']}
          />
          <h2 className="condition-text">{conditions}</h2>
        </div>
      </div>
      <div className="card right-card">
        {windspeed && <p>Wind: {windspeed} km/h</p>}
        {humidity && <p>Humidity: {humidity}%</p>}
      </div>
    </div>
  )
}

export default WeatherCard
