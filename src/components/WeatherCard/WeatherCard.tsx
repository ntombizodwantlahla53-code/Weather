import React from 'react'
import WeatherIcon from '../WeatherIcon/WeatherIcon'
import { format } from 'date-fns'
import styles from './WeatherCard.module.css'

interface Props {
  data: any
  current: any
  temperature: 'C' | 'F'
}
const WeatherCard: React.FC<Props> = ({
  data,
  current,
  temperature
}) => {
  const convert = (temp: number) =>
    temperature === 'F'
      ? (temp * 9) / 5+32
      : temp
  return (
    <div className={styles.currentWeather}>
      <div className={styles.left}>
        <p className={styles.space}>{format(new Date(), 'EEEE, MMM d')}</p>
        <h1 className={styles.tempp}>
          {Math.round(convert(current.temp))}
          °{temperature}
        </h1>
        <p className={styles.feeling}>Feels like:{' '}
          {Math.round(convert(current.feelslike))}°
        </p>
      </div>

      <div className={styles.right}>
        <WeatherIcon icon={current.icon} />
        <h2 className={styles.space}>{current.conditions}</h2>
        <p className={styles.degrees}>High: {Math.round(convert(data.tempmax))}°
          {'/ '}
          Low: {Math.round(convert(data.tempmin))}°
        
        </p>
      </div>
    </div>
  )
}
export default WeatherCard