import React, { useEffect, useState } from "react"
import "./App.css"
import apiUtils from "./utils/apiCalls"
import Content from "./components/Content/Content"
import Sidebar from "./components/Sidebar/Sidebar"

const App = () => {
  const [error, setError] = useState(null)
  const [currentWeather, setCurrentWeather] = useState({})
  const unitSystem = "metric"

  const fetchWeather = (location) => {
    apiUtils
      .fetchCurrentWeather(location, unitSystem)
      .then((result) => {
        console.log(result)
        setCurrentWeather(result)
      })
      .catch((e) => {
        setError({ message: "Could not retrieve data" })
      })
  }

  const handleSearch = (city) => {
    if (city !== "") fetchWeather({ city })
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchWeather({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      })
    } else {
      fetchWeather({ city: "Paris" })
    }
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (Object.keys(currentWeather).length === 0) {
    return <div>Loading…</div>
  } else {
    return (
      <div className="App">
        <Sidebar currentWeather={currentWeather} onSearch={handleSearch} />
        <Content currentWeather={currentWeather} unitSystem={unitSystem} />
      </div>
    )
  }
}

export default App
