import React from 'react'
import { format } from 'date-fns'
import WeatherIcon from '../WeatherIcon/WeatherIcon'
import styles from './WeeklyCard.module.css'
import { FaWind } from "react-icons/fa6";
import { MdOutlineWaterDrop } from "react-icons/md";

interface Props {
  data: any[]
  temperature: 'C'|'F'
  wind?: number
  humidity?: number
}
const WeeklyCard: React.FC<Props> = ({
  data,
  temperature,
  wind,
  humidity
}) => {
  const convert = (temp: number) =>
    temperature === 'F'
      ? (temp * 9) /5+32
      : temp
  return (
    <div className={styles.container}>
      <div className={styles.weeklyCard}>
        <h3 className={styles.WHeading}>Weekly Forecast</h3>
        {data.map((day, index) => (
          <div className={styles.day} key={index}>
            <div className={styles.dayName}>
              {format(new Date(day.datetime),'EEE, d')}
            </div>
            <WeatherIcon icon={day.icon}/>
            <div className={styles.condition}>
              {day.conditions}</div>
            <div className={styles.rain}>
              {day.precipprob}%
            </div>
            <div className={styles.temperature}>
              {Math.round(convert(day.tempmin))}°
              {'/'}
              {Math.round(convert(day.tempmax))}°
            </div>
          </div>
        ))}

      </div>
      <div className={styles.rightCard}>
        <div className={styles.wind}>
          <span><FaWind/></span>
          <div >
            <p>Wind</p>
            <h3>{wind??''} km/h</h3>
          </div>
        </div>
        <div className={styles.hum}>
          <span><MdOutlineWaterDrop/></span>
          <div>
            <p>Humidity</p>
            <h3>{humidity??''}%</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
export default WeeklyCard
