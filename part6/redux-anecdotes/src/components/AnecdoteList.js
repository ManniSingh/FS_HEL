import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voter } from '../reducers/anecdoteReducer'

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
    //console.log('Anec:'+JSON.stringify(anec))
    return(anec.content.includes(filter))
  })
  return(
    <ul>
      {filtered.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(voter(anecdote.id))}
        />
      )}
    </ul>
  )
} 

export default Anecdotes