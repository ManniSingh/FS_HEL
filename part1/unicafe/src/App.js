import React, { useState } from 'react'

const StatisticLine = (props) => {
  return(
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
  )
}

const Statistics = (props) => {
  let total = props.g+props.n+props.b
  let avg = 0
  let pos = 0
  if (total!==0) {
    avg = (props.g-props.b)/total
    pos = (props.g/total)*100
    return(
      <>
      <h1>Statistics</h1>
      <table>
      <tbody>
        <StatisticLine text="good" value ={props.g} />
      
        <StatisticLine text="neutral" value ={props.n} />
      
        <StatisticLine text="bad" value ={props.b} />
      
        <StatisticLine text="all" value ={total} />
      
        <StatisticLine text="average" value ={avg} />
      
        <StatisticLine text="positive" value ={pos} />
        </tbody>
      </table>
      </>
      )
  }
  return(
    <>
    <h1>Statistics</h1>
    <p>No Feedback Given</p>
    </>
    )

  
}


const Button = ({event,text}) => {
  return(
  <button onClick={event}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  
  
  return (
    <div>
      <h1> Give Feedback </h1>
      <Button event={() => setGood(good+1)} text='good' /> 
      <Button event={() => setNeutral(neutral+1)} text='neutral' /> 
      <Button event={() => setBad(bad+1)} text='bad' /> 
      <Statistics g={good} n={neutral} b={bad}/>
    </div>
  )
}

export default App