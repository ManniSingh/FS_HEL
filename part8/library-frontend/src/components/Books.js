import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
// import Notify from './notify'
// import LoginForm from './loginForm'

const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre }
  })
  if (result.loading) {
    return <div>loading...</div>
  }
  const books = result.data.allBooks
  //console.log(books)
  const uniqueGenres = [...new Set(books.flatMap((book) => book.genres))]
  const handleGenreClick = (genre) => {setSelectedGenre(genre)}
  //console.log(books)
  return (
    <div>
      <h2>books</h2>
      <h3>in genre {selectedGenre}</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <ul>
          <li
            key="all"
            className={selectedGenre === 'all' ? 'selected' : ''}
            onClick={() => handleGenreClick('')}
          >
            All Genres
          </li>
          {uniqueGenres.map((genre) => (
            <li
              key={genre}
              className={selectedGenre === genre ? 'selected' : ''}
              onClick={() => handleGenreClick(genre)}
            >
              {genre}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Books
