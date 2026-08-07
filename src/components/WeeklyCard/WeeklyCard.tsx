import React from 'react'
import styles from './WeeklyCard.module.css'
import { format } from 'date-fns'
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

interface DayData {
  datetime: string
  tempmax: number
  tempmin: number
  conditions: string
  icon: string
  precipprob: number
}

interface WeeklyCardProps {
  data: DayData[]
  currentWindspeed?: number 
  currentHumidity?: number  
}

export const WeeklyCard: React.FC<WeeklyCardProps> = ({ 
  data, 
  currentWindspeed, 
  currentHumidity 
}) => {
  return (
    <div className={styles.Container}>
      <span className={styles.hourText} >Weekly Forecast</span>
      <div className={styles.weeklyContainer}>
      {data.map((day, index) => (
        <div className={styles.day} key={index}>
          <div className={styles.left}>
            <div className={styles['day-label']}>
              {format(new Date(day.datetime), 'EEE')}
            </div>
            
            <div className={styles['day-rain']}>
              {day.precipprob}%
            </div>
            <div className={styles['day-condition']}>
              <img src={iconMap[day.icon]} alt={day.conditions} className={styles.icon} />
              <span className={styles['day-text']}>{day.conditions}</span>
            </div>
            <div className={styles['day-temp']}>
              {Math.round(day.tempmin)}° / {Math.round(day.tempmax)}°
            </div>
          </div>
          
          <div className={styles.right}>
            {/* Wind box container */}
            {index === 0 && currentWindspeed !== undefined && (
              <div className={styles.Box}>
                <p>Wind: {currentWindspeed} km/h</p>
              </div>
            )}
            
            {/* Humidity box container */}
            {index === 0 && currentHumidity !== undefined && (
              <div className={styles.HBox}>
                <p>Humidity: {currentHumidity}%</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default WeeklyCard
