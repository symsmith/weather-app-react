import React from "react"
import Day from "./Detail/Day"
import Hour from "./Detail/Hour"
import "./DetailList.css"

const DetailList = ({ type, forecast }) => {
  const daily = type === "daily"
  const days = Array.from(Array(7), (e, i) => i + 1)
  const hours = Array.from(Array(24), (e, i) => i + 1)

  return (
    <div className={"DetailList" + (daily ? " DailyList" : " HourlyList")}>
      {daily
        ? days.map((day) => (
            <Day
              dailyForecast={forecast[day]}
              dayShift={day}
              key={day.toString()}
            />
          ))
        : hours.map((hour) => (
            <Hour
              hourlyForecast={forecast[hour]}
              hourShift={hour}
              key={hour.toString()}
            />
          ))}
    </div>
  )
}

export default DetailList
