const windDirection = (windDeg) => {
  if (windDeg > 11.25 && windDeg <= 33.75) return "NNE"
  if (windDeg > 33.75 && windDeg <= 56.25) return "NE"
  if (windDeg > 56.25 && windDeg <= 78.75) return "ENE"
  if (windDeg > 78.75 && windDeg <= 101.25) return "E"
  if (windDeg > 101.25 && windDeg <= 123.75) return "ESE"
  if (windDeg > 123.75 && windDeg <= 146.25) return "SE"
  if (windDeg > 146.25 && windDeg <= 168.75) return "SSE"
  if (windDeg > 168.75 && windDeg <= 191.25) return "S"
  if (windDeg > 191.25 && windDeg <= 213.75) return "SSW"
  if (windDeg > 213.75 && windDeg <= 236.25) return "SW"
  if (windDeg > 236.25 && windDeg <= 258.75) return "WSW"
  if (windDeg > 258.75 && windDeg <= 281.25) return "W"
  if (windDeg > 281.25 && windDeg <= 303.75) return "WNW"
  if (windDeg > 303.75 && windDeg <= 326.25) return "NW"
  if (windDeg > 326.25 && windDeg <= 348.75) return "NNW"
  return "N"
}

const pressureComment = (pressure) => {
  if (pressure > 1009 && pressure <= 1017) return "Average"
  if (pressure > 1017) return "High"
  return "Low"
}

const humidityComment = (humidity) => {
  if (humidity > 55 && humidity <= 65) return "Average"
  if (humidity > 65) return "High"
  return "Low"
}

const visibilityComment = (visibility) => {
  if (visibility > 0.5 * 1852 && visibility <= 2 * 1852) return "Bad"
  if (visibility > 2 * 1852 && visibility <= 5 * 1852) return "Average"
  if (visibility > 5 * 1852) return "Good"
  return "Very bad"
}

const pollutionComment = (pollutionValue) => {
  switch (pollutionValue) {
    case 1:
      return "Good"
    case 2:
      return "Fair"
    case 3:
      return "Moderate"
    case 4:
      return "Poor"
    default:
      return "Very Poor"
  }
}

const functions = {
  windDirection,
  pressureComment,
  humidityComment,
  visibilityComment,
  pollutionComment
}

export default functions
