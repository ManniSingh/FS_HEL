import React, { useState, useEffect } from 'react'
import PersonForm from './components/pForm.js'
import Filter from './components/filter.js'
import contactService from './services/contacts'

const App = () => {
  // Get initial contacts
  // const [deleted, setDeleted] = useState(false)
  const [ persons, setPersons ] = useState([])
  useEffect(() => {
    contactService
    .getAll()
    .then(initialContacts => {
      setPersons(initialContacts)
    })
  }, [])
  const [[newName,newNum], setNewRecord ] = useState(['',''])
  const [query,setQuery] = useState('')
  /* not sure if i should do this */
  const [filtered,setFilter] = useState(persons)
  /* functions below */

  const addPerson = (event) => {
    event.preventDefault()
    const personData = {
      name: newName,
      number: newNum,
    }
    console.log("newName:",newName)
    console.log(persons)
    let found = persons.filter(data=>data.name===newName)
    console.log(found)
    if (found.length!==0){
      let person = found[0]
      const ID = person.id
      if (person.number===newNum){
        setNotification(`${newName} and ${newNum} are already present in the phonebook`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
      else{
        const okay = window.confirm(`${newName} is already present in the phonebook do you want to update the number?`)
        if (okay){
          const change = { ...person, number: newNum}
          contactService
          .update(ID, change)
          .then(returned => {
            setPersons(persons.map(per => per.id !== ID ? per : returned))
            setNotification(`${newName} is updated with ${newNum} as the new number`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setNotification(`${newName} was already deleted from the server`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setPersons(persons.filter(per => per.id !== ID))
          })
        }
      }
    }else{
      contactService
      .create(personData)
      .then(returnedData => {
        setPersons(persons.concat(returnedData))
        setNotification(`Added ${newName}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
    setNewRecord(['',''])
  }

  /* Handlers below */
  const handleQueryChange = (event) => {
    setQuery(event.target.value)
    //search()
  }

  useEffect(() => {
    if (query !== '') {
      console.log("QUERY",query);
      let list = persons.filter(data => data?data.name.toLowerCase().startsWith(query.toLowerCase()):false)
      setFilter(list)
    }else{
      console.log("QUERY Empty");
      setFilter(persons)
    }
  }, [query,persons]);
  
  const handleNameChange = (event) => {
    setNewRecord([event.target.value.trim(),newNum])
    //console.log("NameChange",event.target.value,newName)
  }

  const handleNumChange = (event) => {
    //console.log(event.target.value)
    setNewRecord([newName,event.target.value.trim()])
  }

  const del = (data,list) => {
    const result = window.confirm(`Delete ${data.name} ?`)
    if (result) {
      contactService.del(data)
      .then(returnedData => {
        setNotification(`Deleted ${data.name}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setPersons(returnedData)
        //setDeleted(true)
      }).catch(e=>{
        setNotification(`${data.name} Not found!`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
  }

  const Persons = (props) => {
    return(
      <ul>
          {props.list.map(data => {
          return(
          <li key={data.id}>{data.name} {data.number} 
          <button onClick={()=>del(data)}>delete</button>
          </li>
          )
          })
          }
      </ul>
    )
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="notifier">
        {message}
      </div>
    )
  }
  const [notification, setNotification] = useState(null)
  /* rendering below */
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter q={query} handler={handleQueryChange}/>
      <PersonForm 
        adder = {addPerson}
        name = {newName}
        nameHandler = {handleNameChange}
        number = {newNum}
        phoneHandler = {handleNumChange}
      />
      <h2>Numbers</h2>
      <Persons list={filtered} />
    </div>
  )
}

export default App
