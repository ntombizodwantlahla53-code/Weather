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
}

export const WeeklyCard: React.FC<WeeklyCardProps> = ({ data }) => {
  return (
    <div className={styles['weekly-container']}>
      {data.map((day, index) => (
        <div className={styles['day-row']} key={index}>
          <div className={styles['day-label']}>
            {format(new Date(day.datetime), 'EEE')}
          </div>
          <div className={styles['day-temp']}>
            {Math.round(day.tempmin)}° / {Math.round(day.tempmax)}°
          </div>
          <div className={styles['day-rain']}>
            {day.precipprob}%
          </div>
          <div className={styles['day-condition']}>
            <img
              src={iconMap[day.icon]} 
            alt={day.conditions} className={styles['condition-icon']}
            />
            <span className={styles['day-text']}>{day.conditions}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WeeklyCard
