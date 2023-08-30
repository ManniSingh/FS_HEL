import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {voter,anec} from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notification'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <li key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </li>
  )
}

const Anecdotes = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.notes)
  const dispatch = useDispatch()
  const filtered = anecdotes.filter(anec=>{
    return(anec.content.includes(filter))
  })
  console.log('Filtered:'+JSON.stringify(filtered))
  return(
    <ul>
      {filtered.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(anec(voter(anecdote.id)))
            dispatch(showNotification(anecdote.content))
          }}
        />
      )}
    </ul>
  )
} 

export default Anecdotes