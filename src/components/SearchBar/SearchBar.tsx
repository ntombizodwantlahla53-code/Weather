import { useState } from 'react'
import styles from './SearchBar.module.css'

interface Props {
  onSearch: (city: string) => void
}
const SearchBar = ({ onSearch }: Props) => {
  const [city, setCity] = useState('')
  const search = (event: React.FormEvent) => {
    event.preventDefault()

    if (city.trim()) {
      onSearch(city)
      setCity('')
    }
  }
  return (
    <form onSubmit={search}>
      <input
        className={styles.searchInput}
        placeholder="Search city"
        value={city}
        onChange={(event) => setCity(event.target.value)}/>
    </form>
  )
}
export default SearchBar