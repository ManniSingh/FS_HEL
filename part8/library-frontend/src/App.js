import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/loginForm'
import Recs from './components/recs'
import { gql, useSubscription } from '@apollo/client'
import Notify from './components/notify'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

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
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      //console.log('Subscription triggered:', data)
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)
      const cacheSnapshot = client.cache.extract()
      console.log('Cache Snapshot:', cacheSnapshot)
      //updateCache(client.cache, { query: ALL_BOOKS, variables: {genre: null} }, addedBook)
    },
  })

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
      <LoginForm setToken={setToken} setPage={setPage}/>
      {/* <Notify errorMessage={errorMessage} /> */}
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
      <Notify errorMessage={errorMessage} /> 
    </div>
  )
}

export default App
