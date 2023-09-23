import React, { useContext } from 'react'
import OpContext from '../OpContext'

function Notification() {
  const [message] = useContext(OpContext)
  if (message === null) {
    return null
  }
  else {
    return (
      <div className="notify">
        {message}
      </div>
    )
  }
}

export default Notification
