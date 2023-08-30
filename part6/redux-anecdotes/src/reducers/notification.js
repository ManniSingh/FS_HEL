import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notify',
    initialState: null,
    reducers: {
        showNotification(state, action) {
            console.log('notify action', action.payload)
            return action.payload
        }
    }
})
  
  export const { showNotification } = notificationSlice.actions
  export default notificationSlice.reducer