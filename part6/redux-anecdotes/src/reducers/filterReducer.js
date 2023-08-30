
import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filter(state, action) {
            console.log('filter state now: ', state)
            console.log('filter action', action)
            switch (action.payload.type) {
              case 'SET_FILTER':
                return action.payload.payload
              default:
                return state
            }
          }
    }
})


  
  export const filterChange = filter => {
    return {
      type: 'SET_FILTER',
      payload: filter,
    }
  }
  
  export const { filter } = filterSlice.actions
  export default filterSlice.reducer