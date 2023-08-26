import React from 'react'
import { useDispatch } from 'react-redux'
import { creator } from '../reducers/anecdoteReducer'

const New = (props) => {
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(creator(content))
  }

  return (
    <form onSubmit={add}>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  )
}

export default New