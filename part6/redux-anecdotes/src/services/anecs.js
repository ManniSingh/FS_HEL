import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const update = (anecObj) => {
  return { ...anecObj, votes: anecObj.votes+1}
}

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createNew = async (content) => {
  const object = asObject(content)
  console.log('Object written:'+JSON.stringify(object))
  const response = await axios.post(baseUrl, object)
  return response.data
}

export const updateVote = async (anecObj) => {
  const object = update(anecObj)
  console.log('Object written:'+JSON.stringify(object))
  const url = baseUrl+'/'+anecObj.id
  const response = await axios.put(url, object) 
  return response.data
}