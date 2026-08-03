import React from 'react'
import {Text} from './../Text/Text'
import style from './WeatherCard.module.css'

export const WeatherCard = () => {
  return (
    <div className={style.weathercard} >
<div className={style.location} ><Text variant='h1'>locat..</Text></div>
    </div>
  )
}
