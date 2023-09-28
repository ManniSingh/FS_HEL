import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  return (
    <div className='flex flex-col items-center mb-4'>
      <div style={hideWhenVisible}>
        <button className= "rounded-md bg-sky-600 px-3.5 py-2.5 text-center" type="button" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className= "rounded-md bg-sky-600 px-3.5 py-2.5 text-center mt-2 ml-[55px]" type="button" onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
