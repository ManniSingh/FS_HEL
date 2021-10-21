import React from 'react'

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

export default PersonForm