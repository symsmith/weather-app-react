import React from "react"
import "./Highlight.css"
import sunriseImg from "./../../../../assets/sunrise.png"
import sunsetImg from "./../../../../assets/sunset.png"

const SunHighlight = ({ timezone, sunrise, sunset }) => {
  const date = new Date()
  const clientTimezone = date.getTimezoneOffset() * 60
  const sunriseTime = new Date((sunrise + timezone + clientTimezone) * 1000)
  const sunsetTime = new Date((sunset + timezone + clientTimezone) * 1000)
  const sunriseHours = sunriseTime.getHours().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
  const sunriseMinutes = sunriseTime.getMinutes().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
  const sunsetHours = sunsetTime.getHours().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
  const sunsetMinutes = sunsetTime.getMinutes().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  })

  return (
    <div className="SunHighlight BaseHighlight">
      <h3 className="highlightTitle">Sunrise &amp; Sunset</h3>
      <div className="sunTimes">
        <div className="sunTime">
          <img src={sunriseImg} alt="sunrise icon" className="sunImg" />
          <p className="sunHour">
            {sunriseHours}:{sunriseMinutes}
          </p>
        </div>
        <div className="sunTime">
          <img src={sunsetImg} alt="sunset icon" className="sunImg" />
          <p className="sunHour">
            {sunsetHours}:{sunsetMinutes}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SunHighlight
