import React from 'react'
import Anecdotes  from './components/Anecdotes'
import New from './components/New'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <h2>create new</h2>
      <New />
    </div>
  )
}

export default App