import React, { useState } from "react"
import "./Sidebar.css"
import { getName, registerLocale } from "i18n-iso-countries"
registerLocale(require("i18n-iso-countries/langs/en.json"))

const Sidebar = ({ onSearch, currentWeather }) => {
  const [cityName, setCityName] = useState("")

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

  const temp = Math.round(currentWeather.main.temp)
  const feelsLike = Math.round(currentWeather.main.feels_like)

  /* Get local time and weekday */
  const date = new Date()
  const weekDay = date.toLocaleString("en-US", { weekday: "long" })
  const hours = date.getHours().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
  const minutes = date.getMinutes().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  })

  /* Capitalize the first letter */
  const weatherDescription =
    currentWeather.weather[0].description.charAt(0).toUpperCase() +
    currentWeather.weather[0].description.slice(1)

  return (
    <div className="Sidebar">
      <form onSubmit={handleSubmit} className="searchForm">
        <div className="iconInput">
          <span className="searchIcon">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
          <input
            type="text"
            className="countrySearch"
            placeholder={
              currentWeather.name +
              ", " +
              getName(currentWeather.sys.country, "en", { select: "alias" })
            }
            value={cityName}
            onChange={handleChange}
          />
        </div>
      </form>
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
