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
  const now = new Date()
  const currentHour = now.getHours()
  const startIndex = data.findIndex(hour => {
    const hourNum = Number(hour.datetime.split(':')[0])
    return hourNum === currentHour
  })
  const hoursToShow: any[] = []
  for(let i = 0; i < 24; i++) {
    const index = (startIndex + i) % data.length
    hoursToShow.push(data[index])
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Hourly Forecast</h2>
      <div className={styles.hourContainer}>
           {hoursToShow.map((hour, index) => {
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
              <div className={styles.percent}>
                {hour.precipprob}%
              </div>
            </div>

          )
        })}
      </div>
      <h3 className={styles.WHeading}>Weekly Forecast</h3>
    </div>
  )
}
export default HourlyCard