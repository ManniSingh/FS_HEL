import React, { useState } from 'react'

const DisplayBest = ({max,argmax,anecdotes}) => {
  return(
    <>
    <h1>Anecdote with most votes</h1>
    <table>
      <tbody>
        <tr>
          <td>
            {anecdotes[argmax]}
          </td>
        </tr>
        <tr>
          <td>
            has {max} votes
          </td>
        </tr>
      </tbody>
    </table>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const copy = { ...votes }
  const [[max, argmax],setMax] = useState([0,0])
  

  const NextRand = (len,selected) => {
    let num = Math.floor(Math.random() * len)
    /* dangerous loop, will do try-catch later*/
    while(num===selected){
      num = Math.floor(Math.random() * len)
    }
    return(num)
  }

  const update = () => {
    copy[selected]+=1
    if (copy[selected]>max) {
      setMax([copy[selected],selected])
    }
    setVotes(copy)
  }

  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <table>
        <tbody>
        <tr>
          <td>
          {anecdotes[selected]}
          </td>
        </tr>
        <tr>
          <td>
          has {votes[selected]} votes
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={update}>vote</button>
            <button onClick={()=>setSelected(NextRand(anecdotes.length,selected))}>next anecdote</button> 
          </td>
        </tr>
        </tbody>
      </table>
      <DisplayBest max={max} argmax={argmax} anecdotes = {anecdotes} />
    </div>
  )
}

export default App