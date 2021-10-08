import React, { useState, useEffect } from 'react'

const Filter = (props) => {
  return(
    <div>
      Filter with: <input value={props.q}
                      onChange={props.handler}
                      />
    </div>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.adder}>
        <h2>Add New</h2>
        <div>
          name: <input 
                value={props.name}
                onChange={props.nameHandler}
                />
        </div>
        <div>
          number: <input value={props.number}
                      onChange={props.phoneHandler}
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = (props) => {
  return(
    <ul>
        {props.list.map(data => {
        return(
        <li key={data.id}>{data.name} {data.num}</li>
        )
        })
        }
    </ul>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', num: '040-123456', id: 1 },
    { name: 'Ada Lovelace', num: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', num: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', num: '39-23-6423122', id: 4 }
  ]) 
  const [[newName,newNum], setNewRecord ] = useState(['',''])
  const [query,setQuery] = useState('')
  /* not sure if i should do this */
  const [filtered,setFilter] = useState(persons)

  let nameList = [] 

  /* functions below */

  const addPerson = (event) => {
    event.preventDefault()
    const personData = {
      name: newName,
      num: newNum,
      id: persons.length+1
    }
    nameList = persons.map(data => data.name)
    nameList.includes(newName)?
    alert(`${newName} is already added to phonebook`):
    setPersons(persons.concat(personData))
    setNewRecord(['',''])
  }

  /* Handlers below */
  const handleQueryChange = (event) => {
    setQuery(event.target.value)
    //search()
  }

  /* used : https://stackoverflow.com/a/65757628/6077501 */
  useEffect(() => {
    console.log("QUERY",query);
    if (query !== '') {
    let list = persons.filter(data => data?data.name.toLowerCase().startsWith(query.toLowerCase()):false)
    setFilter(list)
    }else{
      setFilter(persons)
    }
  }, [query,persons]);
  
  const handleNameChange = (event) => {
    setNewRecord([event.target.value,newNum])
    console.log("NameChange",event.target.value,newName)
  }

  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewRecord([newName,event.target.value])
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
      <Persons list={filtered}/>
    </div>
  )
}

export default App
