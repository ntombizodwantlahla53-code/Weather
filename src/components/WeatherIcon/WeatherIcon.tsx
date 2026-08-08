import styles from './WeatherIcon.module.css'

interface Props {
  icon: string
}

const WeatherIcon = ({ icon }: Props) => {
  const url =
    `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/master/PNG/4th%20Set%20-%20Color/${icon}.png`
  return (
    <img src={url} alt={icon} className={styles.icon}/>
  )
}
export default WeatherIcon