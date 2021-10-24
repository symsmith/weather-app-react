import React, { useEffect, useState } from "react"
import "./App.css"
import apiUtils from "./utils/apiCalls"
import Notification from "./utils/Notification"
import Content from "./components/Content/Content"
import Sidebar from "./components/Sidebar/Sidebar"

const App = () => {
  const [error, setError] = useState({})
  const [currentWeather, setCurrentWeather] = useState({})
  const unitSystem = "metric"

  const fetchWeather = (location) => {
    apiUtils
      .fetchCurrentWeather(location, unitSystem)
      .then((result) => {
        console.log(result)
        setCurrentWeather(result)
        setError({})
      })
      .catch((e) => {
        setError({ message: `Could not find "${location.city}"` })
        setTimeout(() => setError({}), 4000)
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

  if (Object.keys(currentWeather).length === 0) {
    return <div>Loading…</div>
  } else {
    return (
      <div className="App">
        {Object.keys(error).length > 0 && (
          <Notification message={error.message} />
        )}
        <Sidebar currentWeather={currentWeather} onSearch={handleSearch} />
        <Content currentWeather={currentWeather} unitSystem={unitSystem} />
      </div>
    )
  }
}

export default App
