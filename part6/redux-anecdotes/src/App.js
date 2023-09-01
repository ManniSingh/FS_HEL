import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initialize } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialize()) 
  }, [dispatch])

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <VisibilityFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App