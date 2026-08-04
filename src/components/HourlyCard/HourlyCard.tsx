import React from 'react'
import { SiRainmeter } from "react-icons/si";
import styles from './HourlyCard.module.css'

interface HourlyData {
  time: string;
  condition: {
    icon: string;
  };
  temp_c: number;
  chance_of_rain: number;
}

interface HourlyCardProps {
  data: HourlyData[];
}

export const HourlyCard: React.FC<HourlyCardProps> = ({ data }) => {
  return (
    <div className='hourly-container' >
        {data.map((hour, index) => {
return(
    <div className='hourly-card' key={index}>
        <div className='hour-time'>
            {format(parse(hour.time, 'yyyy-MM-dd HH:mm', new Date()), 'h a')}
            </div>
            <img src ={hour.condition.icon} alt="icon" className="hour-icon"/>
            <div className='hour-temp'>{Math.round(hour.temp_c)}°</div>
            <div className='hour-rain'><SiRainmeter/> {hour.chance_of_rain}%</div>
        </div>
);
        })}
    </div>
  );
};
export default HourlyCard;
