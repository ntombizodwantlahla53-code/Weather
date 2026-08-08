
import React, { useState } from 'react'
import styles from './Settings.module.css'

interface SettingsProps {
  onClose: () => void
}

export const Settings: React.FC<SettingsProps> = ({ onClose }) => {

  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [temperature, setTemperature] = useState("C")

  return (
    <div className={styles.settingsPage}>

      <div className={styles.header}>
        <h2>Settings</h2>

        <button onClick={onClose}>
          ✕
        </button>
      </div>


      {/* Theme */}
      <div className={styles.settingBox}>

        <h3>Theme</h3>

        <p>
          Choose your preferred theme
        </p>

        <button
          className={styles.settingButton}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "🌙 Dark" : "☀️ Light"}
        </button>

      </div>


      {/* Notifications */}
      <div className={styles.settingBox}>

        <h3>Notifications</h3>

        <p>
          Weather notifications
        </p>

        <button
          className={styles.settingButton}
          onClick={() => setNotifications(!notifications)}
        >
          {notifications ? "🔔 Enabled" : "🔕 Disabled"}
        </button>

      </div>


      {/* Temperature */}
      <div className={styles.settingBox}>

        <h3>Temperature</h3>

        <p>
          Choose temperature unit
        </p>

        <div className={styles.temperatureButtons}>

          <button
            className={temperature === "C" ? styles.active : ""}
            onClick={() => setTemperature("C")}
          >
            °C
          </button>

          <button
            className={temperature === "F" ? styles.active : ""}
            onClick={() => setTemperature("F")}
          >
            °F
          </button>

        </div>

      </div>


      {/* Saved Links */}
      <div className={styles.settingBox}>

        <h3>🔗 Saved Links</h3>

        <p>
          View your saved weather links
        </p>

        <button className={styles.settingButton}>
          View Saved Links
        </button>

      </div>

    </div>
  )
}

export default Settings

