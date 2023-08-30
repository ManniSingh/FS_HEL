import { configureStore } from '@reduxjs/toolkit'

import anecReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import showNotification from './reducers/notification'

const store = configureStore({
    reducer: {
      notes: anecReducer,
      filter: filterReducer,
      notify: showNotification
    }
  })

export default store
