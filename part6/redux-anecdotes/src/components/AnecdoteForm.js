import React from 'react'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notification'
import {createAnec} from '../reducers/anecdoteReducer'

const New = (props) => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnec(content))
    dispatch(showNotification(content))
  }

  return (
    <form onSubmit={add}>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  )
}

export default New