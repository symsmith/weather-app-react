import React, { useEffect, useState } from "react"
import functions from "../../utils/functions"
import "./Sidebar.css"
import SearchInput from "./SearchInput/SearchInput"

const Sidebar = ({ onSearch, currentWeather, handleLocationClick }) => {
  const [cityName, setCityName] = useState("")
  const [cityIsFavorite, setCityIsFavorite] = useState(false)
  const [changed, setChanged] = useState(false)

  useEffect(() => {
    if (functions.getFavoriteCities()) {
      setCityIsFavorite(functions.isCityFavorite(currentWeather.name))
    } else {
      functions.setFavoriteCities([])
    }
  }, [currentWeather])

  const handleChange = (event) => {
    setCityName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch(cityName)
    setCityName("")
    /* Remove focus on input */
    event.target[0].blur()
  }

  const handleFavoriteCityClick = () => {
    const newFavoriteCity = currentWeather.name
    if (!cityIsFavorite) {
      const favoriteCities = [...functions.getFavoriteCities(), newFavoriteCity]
      functions.setFavoriteCities(favoriteCities)
      setCityIsFavorite(true)
    } else {
      const favoriteCities = functions
        .getFavoriteCities()
        .filter((city) => city !== newFavoriteCity)
      functions.setFavoriteCities(favoriteCities)
      setCityIsFavorite(false)
    }
    setChanged(true)
    setTimeout(() => setChanged(false), 1000)
  }

  const temp = Math.round(currentWeather.main.temp)
  const feelsLike = Math.round(currentWeather.main.feels_like)

  /* Get local time and weekday */
  const date = new Date()
  const weekDay = date.toLocaleString("en-US", { weekday: "long" })
  const hours = date.getHours().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })
  const minutes = date.getMinutes().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })

  /* Capitalize the first letter */
  const weatherDescription =
    currentWeather.weather[0].description.charAt(0).toUpperCase() +
    currentWeather.weather[0].description.slice(1)

  return (
    <div className="Sidebar">
      <SearchInput
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleLocationClick={handleLocationClick}
        currentCityName={currentWeather.name}
        currentCountry={currentWeather.sys.country}
        inputValue={cityName}
      />

      <img
        className="currentWeatherIcon"
        src={
          "https://openweathermap.org/img/wn/" +
          currentWeather.weather[0].icon +
          "@4x.png"
        }
        alt={weatherDescription}
      />

      <h1>
        {temp}°
        {temp !== feelsLike ? (
          <span className="feelsLike">
            Feels like <span className="font-serif">{feelsLike}°</span>
          </span>
        ) : (
          ""
        )}
      </h1>

      <div className="alignment">
        <h2>
          {weekDay},{" "}
          <span className="hour">
            {hours}:{minutes}
          </span>
        </h2>

        <hr />

        <p className="weatherDescription">{weatherDescription}</p>
      </div>
    </div>
  )
}

export default Sidebar
