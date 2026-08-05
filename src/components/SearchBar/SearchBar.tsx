import {useState} from 'react'
import styles from './SearchBar.module.css'

interface SearchBarProps {
  onSearch: (city: string) => void;
}
export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [city, setCity] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(city){
      onSearch(city);
    setCity('');
  }
}
  return (
    <form onSubmit={handleSubmit}>
      <span className= 'search-icon'></span>
      <input className='search-input'
      type="text"
      placeholder="Enter city name"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      />
      </form>
      
  )
}
export default SearchBar
