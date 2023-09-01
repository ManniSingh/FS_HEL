import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecs = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnec = newNote =>
  axios.post(baseUrl, newNote).then(res => res.data)

export const updateAnec = updatedNote =>
  axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote).then(res => res.data)