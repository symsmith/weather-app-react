import React from "react"
import "./Highlight.css"
import compass from "./../../../../assets/compass.svg"

const BaseHighlight = ({ data }) => {
  return (
    <div className="BaseHighlight">
      <h3 className="highlightTitle">{data.title}</h3>
      <h1 className="highlightValue">
        {data.value}
        <span className="highlightUnit">{data.unit}</span>
      </h1>
      <div className="highlightCommentaryBox">
        {data.title === "Wind Status" ? (
          <img
            src={compass}
            alt="compass icon"
            className={"compass" + data.comment + " compassIcon"}
          />
        ) : (
          ""
        )}
        <p className="highlightCommentary">{data.comment}</p>
      </div>
    </div>
  )
}

export default BaseHighlight
