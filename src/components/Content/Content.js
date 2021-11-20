import React, { useEffect, useState } from "react"
import apiUtils from "../../utils/apiCalls"
import DetailList from "./DetailList/DetailList"
import Highlights from "./Highlights/Highlights"
import "./Content.css"

const Content = ({ currentWeather, unitSystem, setUnitSystem }) => {
  const [detailedForecast, setDetailedForecast] = useState({})
  const [dailyActive, setDailyActive] = useState(false)

  const fetchDetails = () => {
    apiUtils
      .fetchForecast(
        {
          lat: currentWeather.coord.lat,
          lon: currentWeather.coord.lon
        },
        unitSystem
      )
      .then((result) => {
        setDetailedForecast(result)
      })
      .catch(() => {
        console.log("Could not fetch details")
      })
  }

  /* Fetch forecast details when coordinates in props change */
  useEffect(() => {
    fetchDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWeather.coord])

  if (Object.keys(detailedForecast).length === 0) {
    return <div>Loading…</div>
  } else {
    const hourlyForecast = detailedForecast.hourly
    const dailyForecast = detailedForecast.daily
    return (
      <div className="Content">
        <div className="buttonsBar">
          <h3
            className="selectTitle"
            onClick={() => setDailyActive(!dailyActive)}
          >
            <span
              className={
                "selectButton" + (!dailyActive ? " selectButtonActive" : "")
              }
            >
              Today
            </span>
            <span className="separator">/</span>
            <span
              className={
                "selectButton" + (dailyActive ? " selectButtonActive" : "")
              }
            >
              Week
            </span>
          </h3>
          <h3
            className="selectTitle"
            onClick={() => {
              if (unitSystem === "metric") setUnitSystem("imperial")
              else setUnitSystem("metric")
            }}
          >
            <span
              className={
                "selectButton" +
                (unitSystem === "metric" ? " selectButtonActive" : "")
              }
            >
              C
            </span>
            <span className="separator">/</span>
            <span
              className={
                "selectButton" +
                (unitSystem === "imperial" ? " selectButtonActive" : "")
              }
            >
              F
            </span>
          </h3>
        </div>
        {dailyActive ? (
          <DetailList
            type="daily"
            forecast={dailyForecast}
            unitSystem={unitSystem}
          />
        ) : (
          <DetailList
            type="hourly"
            forecast={hourlyForecast}
            unitSystem={unitSystem}
          />
        )}
        <h2 className="highlightsTitle">Today's Highlights</h2>
        <Highlights weather={currentWeather} unitSystem={unitSystem} />
      </div>
    )
  }
}

export default Content
