import React from "react"
import { getName, registerLocale } from "i18n-iso-countries"
registerLocale(require("i18n-iso-countries/langs/en.json"))

const SearchInput = ({
  handleSubmit,
  handleChange,
  currentCityName,
  currentCountry,
  inputValue
}) => {
  return (
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
            currentCityName +
            ", " +
            getName(currentCountry, "en", { select: "alias" })
          }
          value={inputValue}
          onChange={handleChange}
        />
      </div>
    </form>
  )
}

export default SearchInput
