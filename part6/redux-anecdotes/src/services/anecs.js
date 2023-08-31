import axios from 'axios'
import { createNote } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createNew = async (content) => {
    const object = createNote(content)
    console.log('Object written:'+JSON.stringify(object.payload))
    const response = await axios.post(baseUrl, object.payload)
    return response.data
}