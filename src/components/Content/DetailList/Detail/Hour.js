import React from "react"
import "./Detail.css"

const Hour = ({ hourlyForecast, hourShift }) => {
  const hourShifted = new Date()
  hourShifted.setTime(hourShifted.getTime() + 1000 * 3600 * hourShift)
  return (
    <div className="Detail Hour">
      <p className="weekDay">{hourShifted.getHours()}h</p>
      <img
        className="forecastWeatherIcon"
        src={
          "https://openweathermap.org/img/wn/" +
          hourlyForecast.weather[0].icon +
          "@4x.png"
        }
        alt={hourlyForecast.weather[0].description}
      />
      <p className="dayTemp">{Math.round(hourlyForecast.temp)}°</p>
    </div>
  )
}

export default Hour
