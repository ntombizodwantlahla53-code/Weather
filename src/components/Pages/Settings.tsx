import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Settings.module.css'
import { IoNotificationsOffOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TbLocationCheck } from "react-icons/tb";
import { MdOutlineLightbulb } from "react-icons/md";
import { MdOutlineNightlightRound } from "react-icons/md";
import { RiDeleteBack2Line } from "react-icons/ri";

interface Props {
  temperature: 'C' | 'F'
  darkMode: boolean
  notifications: boolean
  savedLocations: string[]
  onTemperatureChange: (unit: 'C' | 'F') => void
  onThemeChange: () => void
  onNotificationsChange: () => void
  onClearLocations: () => void
}

const Settings: React.FC<Props> = ({
  temperature,
  darkMode,
  notifications,
  savedLocations,
  onTemperatureChange,
  onThemeChange,
  onNotificationsChange,
  onClearLocations
}) => {
  const navigate = useNavigate()

  return (
    <div className={styles.settingsBckgrnd}>
      <div className={styles.topic}>
        <h2>Settings</h2>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
            <RiDeleteBack2Line/>
        </button>
      </div>

      <div className={styles.settingBox}>

        <h3>Theme</h3>

        <div className={styles.temperatureButtons}>
            <button className={!darkMode ?styles.Button:''}
            onClick={() => {
                if (darkMode) {
                    onThemeChange()
                }
                }}>
                    <MdOutlineLightbulb/> Light
                </button>
                
                <button className={darkMode ?styles.Button:''}
                onClick={() => {
                    if (!darkMode) {
                        onThemeChange()
                    }
                    }}>
                        <MdOutlineNightlightRound /> Dark
                    </button>
                </div>
        </div>

<div className={styles.settingBox}>
  <h3>Notifications</h3>
  <div className={styles.temperatureButtons}>
    <button className={notifications ?styles.Button:''}
      onClick={() => {
        if (!notifications) {
          onNotificationsChange()
        }
      }}>
      <IoIosNotificationsOutline/> Enable
    </button>
    <button className={!notifications ?styles.Button:''}
      onClick={() => {
        if (notifications) { 
            onNotificationsChange()
        }
      }}>
      <IoNotificationsOffOutline/> Disable
    </button>
  </div>
</div>
      <div className={styles.settingBox}>
        <h3>Temperature</h3>
        <div className={styles.temperatureButtons}>
          <button
            className={temperature === 'C' ?styles.Button :''}
            onClick={() => onTemperatureChange('C')}>°C</button>
          <button
            className={temperature === 'F' ?styles.Button :''}
            onClick={() => onTemperatureChange('F')}>°F</button>
        </div>
      </div>
      <div className={styles.settingBox}>
        <h3>Saved Locations</h3>
        {savedLocations.length === 0 ? (
          <p>No saved locations</p>
        ) : (
          <ul>
            {savedLocations.map((location, index) => (
              <li key={index}>
                <TbLocationCheck/> {location}
              </li>
            ))}
          </ul>
        )}
        {savedLocations.length > 0 && (
          <button className={styles.settingButton}
            onClick={onClearLocations}>
            Clear All ofg Saved Locations</button>)}
      </div>
    </div>
  )
}
export default Settings