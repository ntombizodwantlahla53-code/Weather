import React from 'react'
import { format } from 'date-fns'
import WeatherIcon from '../WeatherIcon/WeatherIcon'
import styles from './WeeklyCard.module.css'

interface Props {
  data: any[]
  temperature: 'C'|'F'
  wind?: number
  windDir?: number
  humidity?: number
  uv?: number
  pressure?:number
}

const WeeklyCard: React.FC<Props> = ({
  data,
  temperature,
  wind,
  windDir,
  humidity,
  uv,
  pressure
}) => {
  const convert = (temp: number) =>
    temperature === 'F' ? (temp * 9) / 5 + 32 : temp

  const getWindDirection = (deg?: number) => {
    if (deg === undefined) return '--';
    const directions = ['N','NE','E','SE','S','SW', 'W','NW'];
    return directions[Math.round(deg / 45) % 8];
  }

  const windDirection = getWindDirection(windDir)
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h3 className={styles.WHeading}>Weekly Forecast</h3>
      <div className={styles.weeklyCard}>
        
        {data.map((day, index) => (
          <div className={styles.day} key={index}>
            <div className={styles.dayName}>
              {format(new Date(day.datetime),'EEE, d')}
            </div>
            <WeatherIcon icon={day.icon}/>
            <div className={styles.condition}>
              {day.conditions}
            </div>
            
            <div className={styles.temperature}>
              {Math.round(convert(day.tempmin))}°/{Math.round(convert(day.tempmax))}°
              <div className={styles.rain}>
              {day.precipprob}%
            </div>
            </div>
          </div>
        ))}
      </div>
</div>
      <div className={styles.rightCard}>
        <div className={styles.right}>
          <div className={styles.spaces}>
            <p className={styles.label}>UV Index</p>
            <h3 className={styles.value}>{uv ?? ''}</h3>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.spaces}>
            <p className={styles.label}>Humidity</p>
            <h3 className={styles.value}>{humidity ?? ''}%</h3>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.spaces}>
            <p className={styles.label}>Wind</p>
            <h3 className={styles.wwind}>{windDirection ||'SW'}</h3>
            <p className={styles.ww}>{wind !== undefined ? `${Math.round(wind)} km/h` : ''}</p>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.spaces}>
            <p className={styles.label}>Pressure</p>
            <h3 className={styles.pressuree}>
           {pressure !== undefined ? Math.round(pressure) : ''}</h3>
            <p className={styles.pp}>hpa</p>
          </div>
        </div>
      </div>
    </div>
    
  )
}
export default WeeklyCard