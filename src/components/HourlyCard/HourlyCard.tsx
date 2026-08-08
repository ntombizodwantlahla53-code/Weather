import React from 'react'
import WeatherIcon from '../WeatherIcon/WeatherIcon'
import styles from './HourlyCard.module.css'

interface Props {
  data: any[]
  temperature: 'C' | 'F'
}
const HourlyCard: React.FC<Props> = ({ data, temperature }) => {
  const convert = (temp: number) =>
    temperature === 'F'
      ? (temp * 9) /5+32
      : temp

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Hourly Forecast</h2>
      <div className={styles.hourContainer}>
        {data.map((hour, index) => {
          const number = Number(hour.datetime.split(':')[0])
          const hour12 = number % 12 || 12
          const ampm = number < 12?'AM':'PM'
          const displayTime = `${hour12} ${ampm}`
          return (
            <div
              className={styles.card}
              key={index}>
              <div className={styles.time}>
                {displayTime}</div>
              <WeatherIcon icon={hour.icon} />
              <div className={styles['hour-temp']}>
                {Math.round(convert(hour.temp))}°{temperature}
              </div>
              <div>
                {hour.precipprob}%
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default HourlyCard