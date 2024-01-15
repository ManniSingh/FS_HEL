import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/loginForm'
import Notify from './components/notify'
import Recs from './components/recs'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  useEffect(()=>{
    setPage('authors')
  },[token])
  // console.log(page)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  let display
  switch (page) {
    case 'authors':
      display = <Authors />
      break
    case 'books':
      display = <Books />
      break
    case 'add':
      display = <NewBook />
      break
    case 'recs':
      display = <Recs />
      break
    case 'login':
      display = 
      (
      <div>
      <LoginForm setError={notify} setToken={setToken} setPage={setPage}/>
      <Notify errorMessage={errorMessage} />
      </div>
      )
      break
    default:
      display = null
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recs')}>recommend</button>
            <button onClick={() => setToken(null)}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      {display}
    </div>
  )
}

export default App
