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
        <p>{format(new Date(), 'EEEE, MMMM d')}</p>
        <h1>
          {Math.round(convert(current.temp))}
          °{temperature}
        </h1>
        <p>High: {Math.round(convert(data.tempmax))}°
          {'/ '}
          Low: {Math.round(convert(data.tempmin))}°
        </p>
        <p>Feels like:{' '}
          {Math.round(convert(current.feelslike))}°
        </p>
      </div>

      <div className={styles.right}>
        <WeatherIcon icon={current.icon} />
        <h2>{current.conditions}</h2>
      </div>
    </div>
  )
}
export default WeatherCard