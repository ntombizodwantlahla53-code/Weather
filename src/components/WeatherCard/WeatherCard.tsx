import styles from './WeatherCard.module.css';
import React from 'react';
import { parse, format } from 'date-fns';

const getDayAndHHH = (rawData: string) => {
    const date = parse(rawData, 'yyyy-MM-dd HH:mm', new Date());
    return format(date, 'EEEE, h:mm a');
};  
type WeatherData = {
    temp_c: number;
    condition: any;
    mintemp_c: number;
    maxtemp_c: number;
    feelslike_c: number;
}
type LocationData = {
    localtime: string;
    name: string;
}

const WeatherCard: React.FC<{data: WeatherData; location: LocationData}> = ({data, location}) => {
    const { localtime, name } = location;
    const { temp_c, condition, mintemp_c, maxtemp_c, feelslike_c } = data;
  return (
    <div className = "currentWeather" >
        <div className= 'card-left-card'>
        <div>
            <h2>{name}</h2>
            <h1 className='temp'>{Math.round(temp_c)}°</h1>
            <p>
                {Math.round(mintemp_c)}° / {Math.round(maxtemp_c)}°
            </p>
            <p>feels like {Math.round(feelslike_c)}°</p>|
            <p>{getDayAndHHH(localtime)}</p>
        </div>
        </div>
    </div>
  )
}