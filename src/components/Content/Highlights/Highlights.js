import React, { useEffect, useState } from "react"
import apiUtils from "../../../utils/apiCalls"
import functions from "../../../utils/functions"
import BaseHighlight from "./BaseHighlight/BaseHighlight"
import SunHighlight from "./BaseHighlight/SunHighlight"
import "./Highlights.css"

const Highlights = ({ weather, unitSystem }) => {
  const [airPollution, setAirPollution] = useState({})

  const fetchPollutionData = () => {
    apiUtils
      .fetchAirQuality(weather.coord)
      .then((result) => {
        setAirPollution(result)
      })
      .catch(() => {
        console.log("Could not fetch air pollution")
      })
  }

  useEffect(() => {
    fetchPollutionData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weather.coord])

  const metric = unitSystem === "metric"

  if (Object.keys(airPollution).length === 0) {
    return <div>Loading…</div>
  } else {
    const baseHighlights = [
      {
        title: "Wind Status",
        value: metric
          ? Math.floor(weather.wind.speed * 3.6 * 10) / 10
          : Math.floor(weather.wind.speed),
        unit: metric ? "km/h" : "mph",
        comment: functions.windDirection(weather.wind.deg)
      },
      {
        title: "Pressure",
        value: Math.floor(weather.main.pressure),
        unit: "hPa",
        comment: functions.pressureComment(weather.main.pressure)
      },
      {
        title: "Humidity",
        value: Math.floor(weather.main.humidity),
        unit: "%",
        comment: functions.humidityComment(weather.main.humidity)
      },
      {
        title: "Visibility",
        value: metric
          ? Math.floor(weather.visibility / 1000)
          : Math.floor(weather.visibility * 0.000621371),
        unit: metric ? "km" : "mi",
        comment: functions.visibilityComment(weather.visibility)
      },
      {
        title: "Air Quality (CO Level)",
        value: Math.floor(airPollution.list[0].components.co),
        unit: "μg/m³",
        comment: functions.pollutionComment(airPollution.list[0].main.aqi)
      }
    ]

    return (
      <div className="Highlights">
        <SunHighlight
          timezone={weather.timezone}
          sunrise={weather.sys.sunrise}
          sunset={weather.sys.sunset}
        />
        {baseHighlights.map((highlight) => (
          <BaseHighlight key={highlight.title} data={highlight} />
        ))}
      </div>
    )
  }
}

export default Highlights
