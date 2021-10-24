import axios from "axios"

const apiKey = process.env.REACT_APP_API_KEY
const baseUrl = "https://pro.openweathermap.org/data/2.5/"

const fetchCurrentWeather = (cityName, unitSystem) =>
  axios
    .get(`${baseUrl}weather?q=${cityName}&units=${unitSystem}&appid=${apiKey}`)
    .then((result) => result.data)

const fetchForecast = (coords, unitSystem) =>
  axios
    .get(
      `${baseUrl}onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=current,minutely,alerts&units=${unitSystem}&appid=${apiKey}`
    )
    .then((result) => result.data)

const fetchAirQuality = (coords) =>
  axios
    .get(
      `${baseUrl}air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
    )
    .then((result) => result.data)

const apiUtils = { fetchCurrentWeather, fetchForecast, fetchAirQuality }

export default apiUtils
