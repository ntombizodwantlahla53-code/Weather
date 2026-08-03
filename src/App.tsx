import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import { WeatherCard } from './components/WeatherCard/WeatherCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <WeatherCard/>
    </>
  )
}

export default App
