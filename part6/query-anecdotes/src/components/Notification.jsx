import { useContext } from "react"
import NotifyContext from "../NotifyContext"

const Notification = () => {
  
  const [notification, NotifyDispatch] = useContext(NotifyContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    visibility: notification?'visible':'hidden'
  }

  if(notification){
    setTimeout(() => { 
      console.log('notification dispatched')
      NotifyDispatch(null)
    }, 5000)
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
