import React, { useState, useEffect } from 'react'
import PersonForm from './components/pForm.js'
import Filter from './components/filter.js'
import contactService from './services/contacts'

const App = () => {
  // Get initial contacts
  const [deleted, setDeleted] = useState(false)
  const [ persons, setPersons ] = useState([])
  useEffect(() => {
    contactService
    .getAll()
    .then(initialContacts => {
      setPersons(initialContacts)
    })
  }, [deleted])
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
    let found = persons.filter(data=>data.name===newName)
    if (found.length!==0){
      let person = found[0]
      const ID = person.id
      if (person.number===newNum){
        alert(`${newName} and ${newNum} are already present in the phonebook`)
      }
      else{
        const okay = window.confirm(`${newName} is already present in the phonebook do you want to update the number?`)
        if (okay){
          const change = { ...person, number: newNum}
          contactService
          .update(ID, change)
          .then(returned => {
            setPersons(persons.map(per => per.id !== ID ? per : returned))
          })
          .catch(error => {
            alert(
              `the person was already deleted from the server`
            )
            setPersons(persons.filter(per => per.id !== ID))
          })
        }
      }
    }else{
      contactService
      .create(personData)
      .then(returnedData => {
        setPersons(persons.concat(returnedData))
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
    setNewRecord([event.target.value,newNum])
    //console.log("NameChange",event.target.value,newName)
  }

  const handleNumChange = (event) => {
    //console.log(event.target.value)
    setNewRecord([newName,event.target.value])
  }

  const del = (data,list) => {
    const result = window.confirm(`Delete ${data.name} ?`)
    const response = result?contactService.del(data):false
    contactService
    .getAll()
    .then(initialContacts => {
      setPersons(initialContacts)
      console.log("Got new data!")
    })
    setDeleted(true)
    console.log(persons)
    return(response)
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

  /* rendering below */
  return (
    <div>
      <h2>Phonebook</h2>
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
