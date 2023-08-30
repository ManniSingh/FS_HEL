import { useSelector, useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notification'
//import { useEffect } from 'react'


const Notification = () => {
  //const anecdotes = useSelector(state => state.notes)
  const message = useSelector(state => state.notify)
  const dispatch = useDispatch();
  //const toprint = anecdotes[0].content
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    visibility: message?'visible':'hidden'
  }
  
  if(message){
    setTimeout(() => { 
      console.log('notification dispatched')
      dispatch(showNotification(null));
    }, 5000)
  }
  
  //console.log(status)

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification