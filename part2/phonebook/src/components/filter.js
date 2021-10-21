import React from 'react'

const Filter = (props) => {
    return(
      <div>
        Filter with: <input value={props.q}
                        onChange={props.handler}
                        />
      </div>
    )
  }

export default Filter