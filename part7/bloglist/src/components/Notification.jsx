import React, { useContext } from 'react'
import OpContext from '../OpContext'

const Notification = () => {
  const [notification] = useContext(OpContext)
  return notification ? <div className='p-4 rounded-md shadow-md bg-red-500 text-white text-center'>{notification}</div> : null
}

export default Notification