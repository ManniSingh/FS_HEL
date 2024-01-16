import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { ALL_BOOKS } from './Books'

const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name

      }
      published
      genres
    }
  }
`

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same Book twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    //const allBooks = cache.query(query).data.allBooks
    //console.log(allBooks)
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    // update: (cache, response) => {
    //   const query = {query: ALL_BOOKS}
    //   const existingData = cache.read(query)
    //   console.log(existingData)
    //   const cacheSnapshot = cache.extract()
    //   console.log('Cache Snapshot:', cacheSnapshot)
    //   if (existingData) {
    //     updateCache(cache, query, response.data.addBook)
    //   } 
    //   else {
    //     window.alert("cache empty..")
    //   }
    //   }
    refetchQueries: [{ query: ALL_BOOKS }]
  })

  const submit = async (event) => {
    event.preventDefault()
    await addBook({
      variables: { title, author, published: parseInt(published), genres }
    })


    console.log('added book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook