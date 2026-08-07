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
    
  }
  
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data}) => {
  const {
    temp,
    tempmax,
    tempmin,
    conditions,
    icon,
    feelslike,
    
  } = data

  return (
    <div className={styles.currentWeather}>
      <div className={styles.left}>
        <div>
          
          <p>{format(new Date(), 'EEEE, MMMM d')}</p>
          <h1 className="temp">{Math.round(temp)}°C</h1>
          <p>
            High: {Math.round(tempmax)}° / Low: {Math.round(tempmin)}°
          </p>
          {feelslike && <p>Feels like {Math.round(feelslike)}°</p>}
          
        </div>
        </div>
        <div className={styles.right}>
          <img
            src={iconMap[icon]} 
            alt={conditions} className={styles.icon}
          />
          <h2 className="condition-text">{conditions}</h2>
        
      </div>
      
    </div>
  )
}

export default WeatherCard
