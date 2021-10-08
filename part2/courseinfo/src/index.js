import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course'

const Total = ({ course }) => {
  const total = course.parts.reduce((a,b) => a+b.exercises,0)
  return(
    <p>Number of exercises {total}</p>
  ) 
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
  <div>
  {courses.map(course=>{
    return(
      <div key={course.id}>
        <Course course={course} />
        <Total course={course} />
      </div>
    )
  })}
  </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
