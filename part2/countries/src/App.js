import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  // all data
  const [data,setData] = useState([])

  useEffect(() => {
    console.log('Extracting data...')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setData(response.data)
      })
  }, [])


  // Querying module
  const [query,setQuery] = useState('')
  const Filter = (props) => {
    return(
      <div>
        Find countries: <input value={props.q}
                        onChange={props.handler}
                        />
      </div>
    )
  }

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const [reduced,setReduced] = useState([]) //For reduced lists
  const [toggle,setToggle] = useState([]) //For buttons state

  // Attached to the change in query variable
  useEffect(() => {
    if (query !== '') {
      console.log('Query changed')
      //let list = names.filter(name=>name.toLowerCase().includes(query.toLowerCase()))
      let list = data.filter(record=>record.name.common.toLowerCase().includes(query.toLowerCase()))
      console.log("the query:",query,"---","the list size:",list.length)
      setReduced(list)
    }else{
      setReduced([])
    }
  }, [query,data])

  //Display 

  const View = (props) => {
    setCity(props.dat.capital)
    return(
      <>
        <h1>{props.dat.name.common}</h1>
        <h5>Capital {props.dat.capital}</h5>
        <h5>Population {props.dat.population}</h5>
        <h3>Languages</h3>
        { 
        Object.values(props.dat.languages).map(data => {
        return(<li key={data}>{data}</li>)
        })
        }
        <img src={props.dat.flags.png} alt=''></img>
        <Weather city={props.dat.capital}/>
      </>
    )
  }

  const ShowView = (index) => {
      console.log("Clicked:",index)
      const toggleCopy = [...toggle]
      toggleCopy[index]=!toggleCopy[index]
      setToggle(toggleCopy)
  }

  const Countries = (props) => {
    if (reduced.length<1){
      return(<></>)
    } else if (reduced.length===1){
        const dat = props.list[0]
        return(
            <View dat={dat} />
        )
      }else if(reduced.length<=10){
        return(
          <ul>
            {props.list.map((data,index) => {
            return(
            <li key={data.name.common}>{data.name.common} <button onClick={()=>ShowView(index)}>
              Show
            </button>
            { toggle[index]?<View dat={data} />:false}
            </li>
            )
            })
            }
          </ul>
        )
      }else{
        return(<>Too many matches</>)
      }
    }

  //weather plugin
  const [city,setCity] = useState('') 
  const [w_data,setWeatherData] = useState([])

  //weather data
  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    const URL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='+city+'&appid='+api_key
    console.log('Extracting weather data...')
    axios
      .get(URL)
      .then(response => {
        console.log('weather extracted')
        setWeatherData(response.data)
      })
  }, [city])

  const Weather = ()  => {
    console.log(city)
    console.log(w_data)
    return(
      <div>
        <h2>Weather in {city}</h2>
        <h5>Temperature: {w_data.main.temp}</h5>
        <h5>Wind: {w_data.wind.speed}</h5>
      </div>
    )
  }

  return (
    <div>
      <Filter q={query} handler={handleQueryChange}/>
      <Countries list={reduced}/>
    </div>
  )

}
export default App
