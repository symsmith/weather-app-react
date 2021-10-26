import React from "react"
import locationIcon from "../../../assets/location.svg"
import "./SearchInput.css"
import { getName, registerLocale } from "i18n-iso-countries"
registerLocale(require("i18n-iso-countries/langs/en.json"))

const SearchInput = ({
  handleSubmit,
  handleChange,
  handleLocationClick,
  currentCityName,
  currentCountry,
  inputValue
}) => {
  return (
    <form onSubmit={handleSubmit} className="searchForm">
      <div className="iconInput">
        <span className="locationIcon" onClick={handleLocationClick}>
          <img src={locationIcon} alt="location icon" />
        </span>

        <input
          type="text"
          className="countrySearch"
          placeholder={
            currentCityName +
            ", " +
            getName(currentCountry, "en", { select: "alias" })
          }
          onFocus={(e) => (e.target.placeholder = "Search a city...")}
          onBlur={(e) =>
            (e.target.placeholder =
              currentCityName +
              ", " +
              getName(currentCountry, "en", { select: "alias" }))
          }
          value={inputValue}
          onChange={handleChange}
        />
        <button className="searchIcon">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
    </form>
  )
}

export default SearchInput
