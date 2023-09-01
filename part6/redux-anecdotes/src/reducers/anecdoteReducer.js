import { createSlice } from '@reduxjs/toolkit'
import { getAll,createNew,updateVote } from '../services/anecs'


const anecSlice = createSlice({
  name: 'anecs',
  initialState: [],
  reducers: {
    update(state,action){
      const changedAnec = action.payload
      return state.map(note =>
        note.id !== changedAnec.id ? note : changedAnec 
      ).sort((a, b) => b.votes-a.votes)
    },
    appendAnec(state, action) {
      console.log('Appended:'+JSON.stringify(action.payload))
      return [...state, action.payload].sort((a, b) => b.votes-a.votes)
    },
    setAnecs(state, action) {
      return action.payload.sort((a, b) => b.votes-a.votes)
    }
  }
})

export const initialize = () => {
  return async dispatch => {
    const anecs = await getAll()
    dispatch(setAnecs(anecs))
  }
}

export const createAnec = content => {
  return async dispatch => {
    const newAnec = await createNew(content)
    dispatch(appendAnec(newAnec))
  }
}
 
export const voter = anecObj => {
  return async dispatch => {
    const newAnec = await updateVote(anecObj)
    dispatch(update(newAnec))
  }
}  

export const { update, setAnecs, appendAnec } = anecSlice.actions
export default anecSlice.reducer