import React from "react"
import "./Detail.css"

const Day = ({ dailyForecast, dayShift }) => {
  const date = new Date()
  date.setDate(date.getDate() + dayShift)
  const shortWeekDay = date.toLocaleString("en-US", { weekday: "short" })
  return (
    <div className="Detail Day">
      <p className="weekDay">{shortWeekDay}</p>
      <img
        className="forecastWeatherIcon"
        src={
          "https://openweathermap.org/img/wn/" +
          dailyForecast.weather[0].icon +
          "@4x.png"
        }
        alt={dailyForecast.weather[0].description}
      />
      <p className="dayTemp">
        <span className="maxTemp">{Math.round(dailyForecast.temp.max)}°</span>
        <span className="minTemp">{Math.round(dailyForecast.temp.min)}°</span>
      </p>
    </div>
  )
}

export default Day
