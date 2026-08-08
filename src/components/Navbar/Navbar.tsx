import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RxInfoCircled } from 'react-icons/rx'
import { CgMenuBoxed } from 'react-icons/cg'
import SearchBar from '../SearchBar/SearchBar'
import styles from './Navbar.module.css'

interface Props {
  location: string
  onSearch: (city: string) => void
}
export const Navbar: React.FC<Props> = ({
  location,
  onSearch
  
}) => {
  const navigate = useNavigate()
  return (
    <nav>
      <RxInfoCircled className={styles.infoIcon} />
      <div className={styles.location}>
        <h2>{location}</h2>
      </div>

      <div className={styles.icons}>
        <SearchBar onSearch={onSearch} />
        <CgMenuBoxed
          className={styles.icon}
          onClick={() => navigate('/settings')}/>
      </div>
    </nav>
  )
}
export default Navbar