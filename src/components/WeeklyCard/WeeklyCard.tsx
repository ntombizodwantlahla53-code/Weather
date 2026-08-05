import React from 'react'
import styles from './WeeklyCard.module.css'
import { format } from 'date-fns';

interface DayData {
  date: string
  day: {
    daily_chance_of_rain: string | number
    condition: {
      text: string
      icon: string
    }
  }
}

interface WeeklyCardProps {
  data: DayData[]
}

export const WeeklyCard = ({ data }: WeeklyCardProps) => {
  return (
    <div className={styles['weekly-container']}>
      {data.map((day, index) => (
        <div className={styles['day-row']} key={index}>
          <div className={styles['day-label']}>
            {format(new Date(), 'EEE')}
          </div>
          <div className={styles['day-rain']}>
            {day.day.daily_chance_of_rain}%
          </div>
          <div className={styles['day-condition']}>
            <img
              src={day.day.condition.icon}
              alt="icon"
              className={styles['day-icon']}
            />
            <span className={styles['day-text']}>
              {day.day.condition.text}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WeeklyCard;
