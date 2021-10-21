import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const del = (data) => {
  const request = axios.delete(`${baseUrl}/${data.id}`)
  return (
    request.then(()=>alert("deleted "+data.name)).catch(e=>alert(data.name+" Not found!"))
  )
}

/*
export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}
*/

export default { getAll, create, update, del }