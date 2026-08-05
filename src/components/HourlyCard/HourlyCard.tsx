import React from 'react'
import { SiRainmeter } from "react-icons/si"
import styles from './HourlyCard.module.css'
import { format } from 'date-fns'
import clearDay from '../../assets/icons/clear-day.png'
import clearNight from '../../assets/icons/clear-night.png'
import rainy from '../../assets/icons/rainy.png'
import thunderstorm from '../../assets/icons/thunderstorm.png'
import lightning from '../../assets/icons/lightning.png'
import wind from '../../assets/icons/wind.png'
import cloudy from '../../assets/icons/cloudy.png'
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

interface HourlyData {
  datetime: string
  temp: number
  conditions: string
  icon: string
  precipprob: number
}

interface HourlyCardProps {
  data: HourlyData[]
}

export const HourlyCard: React.FC<HourlyCardProps> = ({ data }) => {
  return (
    <div className={styles['hourly-container']}>
      {data.map((hour, index) => (
        <div className={styles['hourly-card']} key={index}>
          <div className={styles['hour-time']}>
            {format(new Date(`1970-01-01T${hour.datetime}`), 'h a')}
          </div>
          <img
            src={iconMap[hour.icon]} 
            alt={hour.conditions} className={styles['condition-icon']}
          />
          <div className={styles['hour-temp']}>{Math.round(hour.temp)}°</div>
          <div className={styles['hour-rain']}><SiRainmeter /> {hour.precipprob}%</div>
        </div>
      ))}
    </div>
  )
}

export default HourlyCard
