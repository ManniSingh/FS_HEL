import { createContext, useReducer, useContext } from 'react'

const showNotification = (state, action) => {
    console.log('notify action:'+ action)
    return action
}

const NotifyContext = createContext()

export const NotifyContextProvider = (props) => {
    const [notification, NotifyDispatch] = useReducer(showNotification, null)
  
    return (
      <NotifyContext.Provider value={[notification, NotifyDispatch]}>
        {props.children}
      </NotifyContext.Provider>
    )
  }

export default NotifyContext

