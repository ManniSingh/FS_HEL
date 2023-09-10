import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

export const getData = async (country) => {
    const response = await axios.get(baseUrl+country)
    return response.data
  }
