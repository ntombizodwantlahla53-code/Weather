import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Settings.module.css'
import { IoNotificationsOffOutline } from 'react-icons/io5'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { TbLocationCheck } from 'react-icons/tb'
import { MdOutlineLightbulb } from 'react-icons/md'
import { MdOutlineNightlightRound } from 'react-icons/md'
import { RiDeleteBack2Line } from 'react-icons/ri'

interface Props {
  temperature: 'C' | 'F'
  darkMode: boolean
  notifications: boolean
  savedLocations: string[]
  onTemperatureChange: (unit: 'C' | 'F') => void
  onThemeChange: (value: boolean) => void
  onNotificationsChange: () => void
  onClearLocations: () => void
  onSelectLocation: (location: string) => void
}

const Settings: React.FC<Props> = ({
  temperature,
  darkMode,
  notifications,
  savedLocations,
  onTemperatureChange,
  onThemeChange,
  onNotificationsChange,
  onClearLocations,
  onSelectLocation
}) => {
  const navigate = useNavigate()

  return (
    <div className={styles.settingsBckgrnd}>
      <div className={styles.topic}>
        <h2>Settings</h2>

        <button className={styles.backBtn}
          onClick={() => navigate('/')}>Back
        </button>
      </div>
      <div className={styles.settingBox}>
        <h3>Temperature</h3>

        <div className={styles.temperatureButtons}>
          <button className={temperature === 'C' ? styles.Button : ''}
            onClick={() => onTemperatureChange('C')}>
            °C</button>
          <button className={temperature === 'F' ? styles.Button : ''}
            onClick={() => onTemperatureChange('F')}>
            °F</button>
        </div>
      </div>

      <div className={styles.settingBox}>
        <h3>Theme</h3>
        <div className={styles.temperatureButtons}>

          <button className={!darkMode ? styles.Button : ''}
            onClick={() => onThemeChange(false)}>
            <MdOutlineLightbulb />Light
          </button>

          <button className={darkMode ? styles.Button : ''}
            onClick={() => onThemeChange(true)}>
            <MdOutlineNightlightRound />Dark
          </button>
        </div>
      </div>

      <div className={styles.settingBox}>
        <h3>Notifications</h3>
        <button className={notifications ? styles.Button : styles.settingButton}
          onClick={onNotificationsChange}>
          {notifications ? (
            <><IoIosNotificationsOutline /> Notifications On
            </>
          ) : (
            <><IoNotificationsOffOutline /> Notifications Off
            </>
          )}</button>
      </div>
      <div className={styles.settingBox}>
        <h3>Saved Locations</h3>
        {savedLocations.length > 0 ? (
          <>
            {savedLocations.map((location) => (
              <div className={styles.MysavedLocations} key={location} onClick={() => { onSelectLocation(location); navigate('/'); }}>
                <TbLocationCheck /> {location}
              </div>
            ))}
            <button className={styles.settingButton}
              onClick={onClearLocations}>
              <RiDeleteBack2Line /> Clear Locations
            </button>
          </>
        ) : (
          <p>No saved locations</p>
        )}
      </div>
    </div>
  )
}
export default Settings