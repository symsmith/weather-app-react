import React from "react"
import "./Notification.css"

const Notification = ({ message }) => {
  return (
    <div className="Notification">
      <h1 className="errorTitle">Error</h1>
      <p className="errorText">{message}</p>
    </div>
  )
}

export default Notification
